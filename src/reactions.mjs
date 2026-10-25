// Deterministic, renderer-independent reaction decisions and eligible targets.
export const hasShield = runner => runner.hand.some(c=>c.name==='Small Shield'&&c.timing==='Reaction');
export function targetsFor(g,attacker,cardName){
 const range=cardName==='Force Scroll'?2:3;
 return g.runners.map((r,i)=>({r,i})).filter(({r,i})=>i!==attacker&&!r.place&&Math.abs(r.pos-g.runners[attacker].pos)<=range).map(({i})=>i);
}
export function cpuShieldDecision(g,defender,cardName){
 return hasShield(g.runners[defender]) && ['Prison Chains','Force Scroll','Fire Wave'].includes(cardName);
}
export function cpuAction(g,player){
 const p=g.runners[player];if(!p||p.place)return null;
 for(const card of p.hand){if(card.timing!=='Action')continue;
  if(['Prison Chains','Force Scroll'].includes(card.name)){
   const targets=targetsFor(g,player,card.name);if(targets.length)return {card,target:targets.sort((a,b)=>g.runners[b].pos-g.runners[a].pos||a-b)[0]};
  }
  if(card.name==='Fire Wave'&&targetsFor(g,player,card.name).length)return {card};
 }
 return null;
}
