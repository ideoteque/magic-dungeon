import {withChainTransaction} from './chain-transactions.mjs';
import {beginDisplacement,commitDisplacement} from './transactions.mjs';
import {createResolution,clockwiseOrder} from './resolution.mjs';
import {allChest,allAltar,heroes} from './catalog.mjs';
export const LEVELS=[{name:'The Catacombs',points:[3,1],tiles:{3:'CHEST',8:'SPIKES',12:'ALTAR',18:'CHEST',22:'SPIKES',26:'CHEST'}},{name:'The Maze',points:[4,2],tiles:{4:'CHEST',9:'SLIPPERY MOSS',13:'ALTAR',17:'BOTTLENECK',21:'CHEST',25:'BANANA TRAP'}},{name:'The Dungeons',points:[5,2],tiles:{5:'CHEST',9:'PITFALL',12:'ALTAR',16:'CHAINS',20:'CHEST',23:'ALTAR',27:'ANCHOR'}},{name:"Dragon's Lair",points:[6,3],tiles:{4:'CHEST',8:'ALTAR',12:'MOLTEN LAVA',17:'CHEST',21:'BLADE',24:'ALTAR',27:'DRAGON ROAR'}}];
export function rng(seed){
 let x=seed>>>0;
 const random=()=>{x=(1664525*x+1013904223)>>>0;return x/4294967296;};
 // The generator is callable for existing consumers, but its exact state can
 // be captured and restored without advancing it.
 random.getState=()=>x;
 random.setState=(state)=>{if(!Number.isInteger(state)||state<0||state>0xffffffff)throw Error('Invalid RNG state');x=state>>>0;};
 return random;
}
export const die=(random,n)=>Math.floor(random()*n)+1;
export function shuffle(items,random){let a=[...items];for(let i=a.length-1;i>0;i--){let j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export function snakeOrder(count){return Array.from({length:4},(_,r)=>Array.from({length:count},(_,i)=>r%2?count-1-i:i)).flat();}
export function setup(count=2,seed=1){if(![2,3,4].includes(count))throw Error('Players must be 2–4');let random=rng(seed);return {seed,count,random,phase:'draft',pool:shuffle(heroes,random),teams:Array.from({length:count},()=>[]),order:snakeOrder(count),pick:0,level:0,scores:Array(count).fill(0),log:[],unresolved:[],history:[]};}
export function draft(g,player,hero){if(g.phase!=='draft'||g.order[g.pick]!==player||!g.pool.includes(hero))throw Error('Illegal draft');g.teams[player].push(hero);g.pool.splice(g.pool.indexOf(hero),1);g.pick++;if(g.pick===g.order.length)g.phase='select';}
export function startLevel(g,selection){if(g.phase!=='select'||selection.length!==g.count||selection.some((h,i)=>!g.teams[i].includes(h)))throw Error('Illegal hero selection');selection.forEach((h,i)=>g.teams[i].splice(g.teams[i].indexOf(h),1));g.runners=selection.map(hero=>({hero,pos:0,tripped:false,place:0,hand:[],nextBonus:0}));g.places=[];g.turn=0;g.phase='play';g.chest=shuffle(allChest.filter(c=>c.level===g.level+1),g.random);g.altar=shuffle(allAltar.filter(c=>c.level===g.level+1),g.random);g.discard=[];g.ongoing=[];g.log.push(`Level ${g.level+1}: ${selection.join(', ')}`);}
function note(g,message){g.log.push(message);}
function runnablePixie(g,j){return g.runners[j].hero==='PIXIE'&&!g.runners[j].place;}
// Every distinct eligible power activation is one Pixie trigger. Siphon never triggers itself.
function power(g,caster,ability,depth=0){
 const activationId=(g._activationId=(g._activationId||0)+1);
 g.history.push({type:'ability',activationId,runner:caster,hero:g.runners[caster].hero,ability});
 if(depth>12)return;
 const scheduler=createResolution(g);
 for(const j of clockwiseOrder(g.count,g.turn,g.runners.map((r,j)=>j).filter(j=>j!==caster&&runnablePixie(g,j)))){
  g._pixieSeen??=new Set();const key=`${activationId}:${j}`;if(g._pixieSeen.has(key))continue;g._pixieSeen.add(key);
  scheduler.enqueue('ability',j,()=>{
   const old=g.runners[j].pos,casterPos=g.runners[caster].pos;
   move(g,j,1,{magical:true,depth:depth+1});
   if(old<casterPos&&g.runners[j].pos>casterPos){g.runners[j].nextBonus++;note(g,'PIXIE gains +1 next roll after passing caster');}
  },{label:`PIXIE siphon ${activationId}:${j}`,guard:()=>g.phase==='play'&&!g.runners[j].place});
 }
 scheduler.drain();
}
// Shared atomic displacement pipeline: commit all positions from a snapshot,
// rank simultaneous finishes clockwise, then resolve occupancy reactions before
// guarded destination events. Teleports never create passing triggers.
function atomicDisplace(g,changes,{kind='global',depth=0,piggyback=false}={}){
 if(g.phase!=='play')return false;
 g.dispatchHistory??=[];g.dispatchHistory.push({kind,participants:changes.map(x=>x.i),snapshot:changes.map(x=>({i:x.i,from:x.from,to:x.to}))});
 const tx=beginDisplacement(g,changes,{kind});
 if(!tx)return false;
 const entries=tx.entries;
 commitDisplacement(g,tx);
 for(const {i,from,to} of entries){
  g.history.push({type:'move',runner:i,from,to,magical:true,[kind]:true});
 }
 // A batch is committed before any reaction, including the second finisher.
 for(const {i,to} of entries)if(to===30&&g.phase==='play')finish(g,i);
 if(g.phase!=='play')return true;
 const reactions=[];
 for(const {i,to} of entries){
  if(to<=0||to>=30||g.runners[i].place)continue;
  const actor=g.runners[i];
  if(actor.hero==='GRONK'){
   for(let j=0;j<g.count;j++)if(j!==i&&!g.runners[j].place&&g.runners[j].pos===to){
    reactions.push({runner:i,label:`GRONK atomic eject ${j}`,guard:()=>g.runners[j].pos===g.runners[i].pos,run:()=>{
     power(g,i,'GRONK EXCLUSION',depth);move(g,j,-1,{magical:true,forced:true,depth:depth+1});
    }});
   }
  }else{
   const gronk=g.runners.findIndex((r,j)=>j!==i&&!r.place&&r.hero==='GRONK'&&r.pos===to);
   if(gronk>=0)reactions.push({runner:gronk,label:`GRONK atomic excludes ${i}`,guard:()=>g.runners[i].pos===g.runners[gronk].pos,run:()=>{
    power(g,gronk,'GRONK EXCLUSION',depth);move(g,i,-1,{magical:true,forced:true,depth:depth+1});
   }});
  }
 }
 queueHeroReactions(g,reactions);
 if(g.phase==='play')resolveDestinations(g,entries.filter(x=>x.to!==30).map(x=>({i:x.i,to:x.to,piggyback})),{depth:depth+1});
 return true;
}
// Single displacement entry point. All sources register their intent here;
// ordinary movement retains step/passing semantics, while teleport/global
// commits are atomic. Nested reaction queues are not yet one global drain.
function dispatchDisplacementInternal(g,event){
 if(!event||!['ordinary','teleport','global'].includes(event.kind))throw Error('Unknown displacement kind');
 if(event.kind==='ordinary'){
  g.dispatchHistory??=[];
  g.dispatchHistory.push({kind:'ordinary',runner:event.i,amount:event.amount});
  return performMove(g,event.i,event.amount,event.options||{});
 }
 return atomicDisplace(g,event.changes,{...(event.options||{}),kind:event.kind});
}
// Simultaneous swap; only endpoints matter, not traversed squares.
function swapInternal(g,i,j,{depth=0}={}){
 if(g.phase!=='play'||i===j||!g.runners[i]||!g.runners[j]||g.runners[i].place||g.runners[j].place)return false;
 const from=g.runners[i].pos,to=g.runners[j].pos;
 g.history.push({type:'swap',runner:i,other:j,from,to});
 note(g,`${g.runners[i].hero} swaps with ${g.runners[j].hero}`);
 dispatchDisplacement(g,{kind:'teleport',changes:[{i,from,to},{i:j,from:to,to:from}],options:{kind:'teleport',depth}});
 if(g.phase==='play')power(g,i,'PHASE SHIFT',depth);
 return true;
}
// Queue hero reactions as first-class ability events. Nested forced movements
// are processed before the outer actor's guarded destination activation.
// Each queue drains to completion, including its nested chains, before landing.
function queueHeroReactions(g,events){
 if(!events.length||g.phase!=='play')return {trace:[],steps:0};
 const resolver=createResolution(g);
 for(const event of events){
  resolver.enqueue('ability',event.runner,event.run,{
   label:event.label,
   guard:()=>g.phase==='play'&&!g.runners[event.runner].place&&(!event.guard||event.guard())
  });
 }
 const result=resolver.drain();
 return result;
}
// Renderer-independent, deterministic movement reactions (C01: abilities before spaces).
// "passing" requires starting behind and ending ahead; merely crossing an occupied
// square is not enough for Grok/Chiron. These reactions are not teleports.
function performMove(g,i,amount,{magical=false,resolve=true,depth=0,forced=false}={}){
 if(depth>16){note(g,'Effect chain limit; requires review');g.unresolved.push('reaction-chain-limit');return;}
 const p=g.runners[i];if(p.place||g.phase!=='play')return;
 const deferredRiderLandings=[];const origin=p.pos;const riders=(!forced&&!g._globalEvent&&p.hero!=='GNAT')?g.runners.map((r,j)=>j).filter(j=>j!==i&&!g.runners[j].place&&g.runners[j].hero==='GNAT'&&g.runners[j].pos===origin):[];let target=Math.max(0,origin+amount);
 if(g.level===3&&!magical&&amount>0&&target>30){
  const hero=die(g.random,20),dragon=die(g.random,20);note(g,`Dragon Challenge ${hero} vs ${dragon}`);
  if(hero>dragon)target=30;else{p.tripped=true;note(g,`${p.hero} becomes Tripped after failed Dragon Challenge`);return;}
 }
 const destination=Math.min(30,target);
 const passed=amount>0?g.runners.map((r,j)=>({r,j})).filter(({r,j})=>j!==i&&!r.place&&origin<r.pos&&destination>r.pos):[];
 const ordinaryTx=beginDisplacement(g,[{i,from:origin,to:destination}],{kind:'ordinary'});
 commitDisplacement(g,ordinaryTx);
 g.history.push({type:'move',runner:i,from:origin,to:p.pos,magical});note(g,`${p.hero} moves to ${p.pos}`);
 // Ride is based on pre-movement co-occupancy; destination benefits do not transfer.
 for(const j of riders){if(g.phase!=='play')break;const rider=g.runners[j];if(rider.place)continue;
  const start=rider.pos;const rideTx=beginDisplacement(g,[{i:j,from:start,to:destination}],{kind:'piggyback'});commitDisplacement(g,rideTx);
  g.history.push({type:'move',runner:j,from:start,to:destination,magical:true,piggyback:true});
  note(g,`GNAT rides ${p.hero} to ${destination}`);
  if(destination===30){g._pendingPiggybackFinish??=[];g._pendingPiggybackFinish.push(j);}
  else if(resolve){deferredRiderLandings.push({i:j,to:destination,piggyback:true});}
 }
 // Build one priority batch for passing, forced drag and occupancy reactions.
 // Targets for Vespera are captured before any reaction is executed.
 const reactions=[];
 if(!magical&&amount>0&&(p.hero==='CHIRON'||p.hero==='GROK')){
  for(const {j} of passed){
   const knock=p.hero==='CHIRON'?2:1;
   reactions.push({runner:i,label:`${p.hero} pass ${j}`,run:()=>{
    if(g.runners[j].place)return;
    note(g,`${p.hero} passes ${g.runners[j].hero}: knockback ${knock}`);
    power(g,i,p.hero+' PASS',depth);
    move(g,j,-knock,{magical:true,forced:true,depth:depth+1});
   }});
  }
 }
 if(forced&&amount<0&&p.hero==='VESPERA'){
  const targets=g.runners.map((r,j)=>({r,j})).filter(({r,j})=>j!==i&&!r.place&&Math.abs(r.pos-origin)<=3).map(x=>x.j);
  for(const j of targets){
   reactions.push({runner:i,label:`VESPERA drag ${j}`,run:()=>{
    if(g.runners[j].place)return;
    note(g,`VESPERA drags ${g.runners[j].hero} back ${-amount}`);
    power(g,i,'VESPERA DRAG',depth);
    move(g,j,amount,{magical:true,forced:true,depth:depth+1});
   }});
  }
 }
 if(p.pos>0&&p.pos<30){
  if(p.hero==='GRONK'){
   for(let j=0;j<g.count;j++)if(j!==i&&!g.runners[j].place&&g.runners[j].pos===p.pos){
    reactions.push({runner:i,label:`GRONK eject ${j}`,guard:()=>g.runners[j].pos===p.pos,run:()=>{
     note(g,`GRONK ejects ${g.runners[j].hero}`);power(g,i,'GRONK EXCLUSION',depth);
     move(g,j,-1,{magical:true,forced:true,depth:depth+1});
    }});
   }
  }else{
   const gronk=g.runners.findIndex((r,j)=>j!==i&&!r.place&&r.hero==='GRONK'&&r.pos===p.pos);
   if(gronk>=0)reactions.push({runner:gronk,label:`GRONK excludes ${i}`,guard:()=>g.runners[gronk].pos===p.pos,run:()=>{
    note(g,`${p.hero} cannot share GRONK's space`);power(g,gronk,'GRONK EXCLUSION',depth);
    move(g,i,-1,{magical:true,forced:true,depth:depth+1});
   }});
  }
  if(p.hero==='THORIN BREWBURN'){
   const victims=g.runners.map((r,j)=>({r,j})).filter(({r,j})=>j!==i&&!r.place&&r.pos===p.pos).map(x=>x.j);
   for(const j of victims)reactions.push({runner:i,label:`THORIN slam ${j}`,guard:()=>g.runners[j].pos===p.pos,run:()=>{
    note(g,`THORIN BREWBURN slams ${g.runners[j].hero}`);power(g,i,'THORIN SLAM',depth);
    g.runners[j].tripped=true;move(g,j,-3,{magical:true,forced:true,depth:depth+1});
   }});
  }
 }
 queueHeroReactions(g,reactions);
 if(g.phase!=='play')return;
 if(p.pos===30||(g._pendingPiggybackFinish||[]).length){
  const batch=[i,...(g._pendingPiggybackFinish||[])];g._pendingPiggybackFinish=[];
  // Atomic finish ranking: active player first, then clockwise.
  const active=g.turn;batch.sort((a,b)=>((a-active+g.count)%g.count)-((b-active+g.count)%g.count));
  for(const j of batch){if(g.phase==='play'&&!g.runners[j].place&&g.runners[j].pos===30)finish(g,j);}return;
 }
 // A reaction may have moved the actor off their original destination.
 if(resolve){resolveDestinations(g,[{i,to:destination},...deferredRiderLandings],{depth:depth+1});}
}
// Chain-local repeated-state detection: no arbitrary truncation without reporting.
// The signature includes relevant positions, status and action parameters; identical
// states in one nested chain cannot make progress and are flagged for adjudication.
function moveInternal(g,i,amount,options={}){
 const root=!g._movementChain;
 if(root)g._movementChain={seen:new Set()};
 const key=JSON.stringify([i,amount,!!options.magical,!!options.forced,
  g.runners?.map(r=>[r.pos,r.tripped,r.place,r.hand.length]),g.phase]);
 if(g._movementChain.seen.has(key)){
  note(g,'Repeated movement state detected; effect chain halted pending rules review');
  g.unresolved.push('repeated-movement-state');
  if(root)delete g._movementChain;
  return;
 }
 g._movementChain.seen.add(key);
 try{return dispatchDisplacement(g,{kind:'ordinary',i,amount,options});}
 finally{if(root)delete g._movementChain;}
}

// Global effects move every eligible runner exactly once from a single snapshot.
// This includes Gnat; no additional piggyback and no duplicate Vespera drag.
function globalMoveInternal(g,amount,{forced=true}={}){
 if(g.phase!=='play')return false;
 const changes=g.runners.map((r,i)=>({i,from:r.pos,to:Math.max(0,Math.min(30,r.pos+amount)),place:r.place})).filter(x=>!x.place);
 g.history.push({type:'global',amount,targets:changes.map(({i,from,to})=>({i,from,to}))});
 const result=dispatchDisplacement(g,{kind:'global',changes,options:{kind:'global'}});
 if(forced&&amount<0&&changes.some(x=>g.runners[x.i].hero==='VESPERA'))
  note(g,'VESPERA global drag: all eligible runners already displaced exactly once');
 return result;
}

function finish(g,i){let p=g.runners[i];if(p.place)return;p.place=g.places.length+1;g.places.push(i);note(g,`${p.hero} finishes #${p.place}`);if(g.places.length===2){g._pendingPiggybackFinish=[];g.phase='results';g.places.forEach((idx,rank)=>g.scores[idx]+=LEVELS[g.level].points[rank]);}}
function leader(g,last=false){let available=g.runners.map((p,i)=>({p,i})).filter(x=>!x.p.place);available.sort((a,b)=>last?a.p.pos-b.p.pos:b.p.pos-a.p.pos);return available[0]?.i;}
function draw(g,i){let card=g.chest.shift();if(!card){note(g,'Chest deck exhausted: unresolved official rule');g.unresolved.push('chest-exhaustion');return;}let hand=g.runners[i].hand;hand.push(card);while(hand.length>2){let discarded=hand.shift();g.discard.push(discarded);note(g,`Hand limit: ${discarded.name} discarded (TEMPORARY automatic policy; player choice pending)`);g.unresolved.push('hand-discard-choice');}note(g,`${g.runners[i].hero} draws ${card.name}`);}
function altar(g,i,depth){let card=g.altar.shift();if(!card){note(g,'Altar deck exhausted: unresolved official rule');g.unresolved.push('altar-exhaustion');return;}note(g,`ALTAR: ${card.name}`);switch(card.name){case 'Ancient Blessing':{let j=leader(g,true);if(j!==undefined)move(g,j,3,{magical:true,depth});break;}case 'Shared Loot':g.runners.forEach((p,j)=>{if(!p.place)draw(g,j);});break;case 'Root Quake':globalMove(g,-2);break;case 'Gust of Wind':{let a=leader(g),b=leader(g,true);if(a!==undefined)move(g,a,-3,{magical:true,forced:true,depth});if(b!==undefined)move(g,b,3,{magical:true,depth});break;}case 'Public Execution':{let a=leader(g);if(a!==undefined){move(g,a,-4,{magical:true,forced:true,depth});g.discard.push(...g.runners[a].hand.splice(0));}break;}case 'Hasty Mists':case 'Arcane Silence':case 'The Dragon Awakes':case 'Slippery Moss':g.ongoing.push(card.name);break;default:note(g,`PENDING: ${card.name} effect not implemented`);g.unresolved.push(card.name);}}
// Queue gateway for landing effects. The guard cancels a destination if a
// preceding ability or reaction has displaced the runner. Each batch is
// drained deterministically (active player, then clockwise).
export function resolveDestinations(g,arrivals,{depth=1}={}){
 if(g.phase!=='play')return {trace:[],steps:0};
 const resolver=createResolution(g);
 for(const arrival of arrivals){
  const {i,to,piggyback=false}=arrival;
  resolver.enqueue('destination',i,()=>land(g,i,depth,{piggyback}),{
   label:`destination ${i}@${to}`,
   guard:()=>g.phase==='play'&&!g.runners[i].place&&g.runners[i].pos===to
  });
 }
 const result=resolver.drain();
 return result;
}
function land(g,i,depth,{piggyback=false}={}){let p=g.runners[i],kind=LEVELS[g.level].tiles[p.pos];if(kind==='CHEST'){if(!piggyback)draw(g,i);}else if(kind==='ALTAR'){if(!piggyback)altar(g,i,depth);}else if(kind){note(g,`PENDING TRAP: ${kind} numerical effect not verified`);g.unresolved.push(kind);}}
function turnInternal(g,{roll,action}={}){if(g.phase!=='play')throw Error('No active race');let i=g.turn,p=g.runners[i];if(p.place)throw Error('Finished hero cannot move');if(p.hero==='WARP'&&action?.type==='phaseShift'){if(!swap(g,i,action.target))throw Error('Illegal Phase Shift target');}else if(p.tripped){p.tripped=false;note(g,`${p.hero} skips main roll (Tripped)`);}else{let n=roll??die(g.random,6);if(!Number.isInteger(n)||n<1||n>6)throw Error('Invalid d6');note(g,`${p.hero} rolls ${n}`);if(p.nextBonus){n+=p.nextBonus;note(g,`Bonus +${p.nextBonus}`);p.nextBonus=0;}if(p.hero==='GROK'&&i===leader(g,true)){n+=3;note(g,'GROK +3 last place');}if(p.hero==='THORIN GREEDFOOT'&&i===leader(g,true)){n+=2;note(g,'THORIN GREEDFOOT +2 last place');}if(p.hero==='OLARIN'&&n===1){let j=leader(g);if(j!==undefined&&j!==i){const a=p.pos,b=g.runners[j].pos;[p.pos,g.runners[j].pos]=[b,a];g.history.push({type:'swap',runner:i,other:j,from:a,to:b});note(g,'OLARIN swaps with leader');if(p.pos===30)finish(g,i);}else note(g,'OLARIN rolls 1: no movement (already leader)');}else{if(p.hero==='MASTER YOD-AH'&&action==='flip'){n=7-n;note(g,'YOD-AH flips die');}if(p.hero==='IGNIS'&&action==='double'){n*=2;p.tripped=true;note(g,'IGNIS doubles roll and Trips');}if(p.hero==='PIP'&&n===6&&action==='disrupt'){g.runners.forEach((r,j)=>{if(j!==i&&!r.place&&die(g.random,6)%2===1)r.tripped=true;});note(g,'PIP disrupts');}else move(g,i,n);}}if(g.phase==='play'){for(let step=1;step<=g.count;step++){let j=(i+step)%g.count;if(!g.runners[j].place){g.turn=j;break;}}}return g;}
// One complete turn (including roll, ability chains, destination, scoring and
// turn advance) is a single recoverable action on unexpected exceptions.
export function turn(g,options={}){return withChainTransaction(g,'turn',()=>turnInternal(g,options));}
export function nextLevel(g,selection){if(g.phase!=='results')throw Error('Race not finished');if(g.level===3){g.phase='done';return;}g.level++;g.phase='select';if(selection)startLevel(g,selection);}
// Reaction window: a defending player may explicitly elect to spend Small Shield.
// No implicit CPU decision is made here; the UI must surface this choice.
function defend(g,target,{shieldTargets=[]}={}){
 if(!shieldTargets.includes(target))return false;
 const p=g.runners[target];
 const k=p.hand.findIndex(c=>c.name==='Small Shield'&&c.timing==='Reaction');
 if(k<0)return false;
 const [shield]=p.hand.splice(k,1);g.discard.push(shield);
 note(g,`${p.hero} reacts with Small Shield; harmful directed effect cancelled`);
 g.history.push({type:'reaction',runner:target,card:'Small Shield'});
 return true;
}
export function playCard(g,i,id,{target,shieldTargets=[]}={}){if(g.phase!=='play'||i!==g.turn||g.runners[i].place)throw Error('Not your turn');let p=g.runners[i],index=p.hand.findIndex(c=>c.id===id);if(index<0)throw Error('Card not in hand');let card=p.hand[index];if(card.timing!=='Action')throw Error('Reaction needs qualifying trigger');if(card.name==='Speed Potion'){p.nextBonus+=2;}else if(card.name==='Prison Chains'||card.name==='Force Scroll'){
 if(!Number.isInteger(target)||target===i||!g.runners[target]||g.runners[target].place||Math.abs(g.runners[target].pos-p.pos)>(card.name==='Prison Chains'?3:2)){note(g,`Illegal target for ${card.name}`);return false;}
 resolveAttacks(g,i,card.name,[target],shieldTargets);
 }else if(card.name==='Fire Wave'){
 const targets=g.runners.map((r,j)=>j!==i&&!r.place&&Math.abs(r.pos-p.pos)<=3?j:-1).filter(j=>j>=0);
 resolveAttacks(g,i,card.name,targets,shieldTargets);
 note(g,`Fire Wave affects ${targets.length} nearby heroes`);
 }else if(card.name==='Dragon Sacrifice'){
 move(g,i,-2,{magical:true,forced:true});for(let j=0;j<g.count&&g.phase==='play';j++)if(j!==i&&!g.runners[j].place)move(g,j,-4,{magical:true,forced:true});note(g,'Dragon Sacrifice resolved');
 }else if(card.name==='Cursed Chest'){draw(g,i);draw(g,i);move(g,i,-2,{magical:true,forced:true});}else if(card.name==='Warp Pearl'){let j=leader(g);if(j!==undefined&&j!==i){swap(g,i,j);}}else{note(g,`PENDING ACTION: ${card.name}`);return false;}p.hand.splice(p.hand.findIndex(c=>c.id===id),1);g.discard.push(card);note(g,`Played ${card.name}`);return true;}

// Directed attack windows: all eligible defenders receive their reactions in
// active-player clockwise order, then unblocked effects resolve. The existing
// UI supplies explicit human shield decisions; CPU decisions are supplied by UI.
export function resolveAttacks(g,attacker,cardName,targets,shieldTargets=[]){
 const resolver=createResolution(g);const blocked=new Set();
 const ordered=clockwiseOrder(g.count,g.turn,targets);
 for(const j of ordered){
  resolver.enqueue('reaction',j,()=>{if(defend(g,j,{shieldTargets}))blocked.add(j);},{label:`${cardName}: shield ${j}`});
 }
 // Consequences run after reaction windows; cancelled targets are not moved.
 for(const j of ordered){
  resolver.enqueue('ability',j,()=>{
   if(blocked.has(j)||g.phase!=='play'||g.runners[j].place)return;
   if(cardName==='Prison Chains'){g.runners[j].tripped=true;note(g,`${g.runners[attacker].hero} Trips ${g.runners[j].hero}`);}
   else if(cardName==='Force Scroll'||cardName==='Fire Wave'){move(g,j,-3,{magical:true,forced:true});note(g,`${cardName} pushes ${g.runners[j].hero} back 3`);}
  },{label:`${cardName}: consequence ${j}`});
 }
 const result=resolver.drain();return result;
}

// One root transaction spans nested movement/ability/destination reactions.
// A genuine execution error restores the pre-action state; unresolved rule
// conditions remain reported, without erasing legitimate earlier effects.
export function dispatchDisplacement(g,event){return withChainTransaction(g,'displacement',()=>dispatchDisplacementInternal(g,event));}
export function move(g,i,amount,options={}){return withChainTransaction(g,'move',()=>moveInternal(g,i,amount,options));}
export function swap(g,i,j,options={}){return withChainTransaction(g,'swap',()=>swapInternal(g,i,j,options));}
export function globalMove(g,amount,options={}){return withChainTransaction(g,'global',()=>globalMoveInternal(g,amount,options));}
