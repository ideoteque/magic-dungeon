import {rng,setup,draft,startLevel,turn,playCard,nextLevel} from './engine.mjs';

export const SAVE_VERSION=1;
const OMIT=new Set(['random','_chainTransaction','_movementChain','_resolutionScheduler','_scheduler']);
function plain(g){
 if(g._chainTransaction||g._movementChain)throw Error('Cannot save during an active transaction');
 if(typeof g.random?.getState!=='function')throw Error('RNG does not support deterministic save');
 const data={};
 for(const [k,v] of Object.entries(g)){
  if(OMIT.has(k))continue;
  if(typeof v==='function')throw Error(`Cannot serialize function ${k}`);
  if(v instanceof Set)data[k]={__mdSet:[...v]};
  else data[k]=structuredClone(v);
 }
 return data;
}
function assertObject(x){if(!x||typeof x!=='object'||Array.isArray(x))throw Error('Invalid save document');}
export function exportSave(g){
 const state=plain(g);
 return JSON.stringify({format:'magic-dungeon-save',version:SAVE_VERSION,rng:{type:'lcg32',state:g.random.getState()},state});
}
export function importSave(serialized){
 const doc=typeof serialized==='string'?JSON.parse(serialized):structuredClone(serialized);
 assertObject(doc);
 if(doc.format!=='magic-dungeon-save'||doc.version!==SAVE_VERSION)throw Error('Unsupported save format/version');
 assertObject(doc.rng);assertObject(doc.state);
 if(doc.rng.type!=='lcg32'||!Number.isInteger(doc.rng.state)||doc.rng.state<0||doc.rng.state>0xffffffff)throw Error('Invalid RNG snapshot');
 const s=doc.state;
 if(![2,3,4].includes(s.count)||!['draft','select','play','results','done'].includes(s.phase)||!Number.isInteger(s.level)||s.level<0||s.level>3||!Array.isArray(s.teams)||s.teams.length!==s.count||!Array.isArray(s.scores)||s.scores.length!==s.count||!Array.isArray(s.log)||!Array.isArray(s.history)||!Array.isArray(s.unresolved))throw Error('Invalid game state');
 if(s.phase==='play'||s.phase==='results'){
  if(!Array.isArray(s.runners)||s.runners.length!==s.count||!Array.isArray(s.places)||!Number.isInteger(s.turn)||s.turn<0||s.turn>=s.count)throw Error('Invalid race state');
  if(s.runners.some(r=>typeof r.hero!=='string'||!Number.isInteger(r.pos)||r.pos<0||r.pos>30||!Array.isArray(r.hand)||!Number.isInteger(r.place)||r.place<0||r.place>2))throw Error('Invalid runner');
 }
 const game={};
 for(const [k,v] of Object.entries(s)){
  if(OMIT.has(k)||k==='__proto__'||k==='constructor'||k==='prototype')throw Error('Forbidden state field');
  game[k]=v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length===1&&Array.isArray(v.__mdSet)?new Set(v.__mdSet):structuredClone(v);
 }
 game.random=rng(0);game.random.setState(doc.rng.state);
 return game;
}
// Command replay is deliberately explicit: UI animations, prompts, and external
// side effects are not part of the deterministic rules engine.
export function replayCommands(initialSave,commands){
 if(!Array.isArray(commands))throw Error('Commands must be an array');
 const game=importSave(initialSave);
 for(const cmd of commands){
  assertObject(cmd);
  if(cmd.rngDraws!==undefined){if(!Number.isInteger(cmd.rngDraws)||cmd.rngDraws<0||cmd.rngDraws>10)throw Error('Invalid RNG draws');for(let k=0;k<cmd.rngDraws;k++)game.random();}
  switch(cmd.type){
   case 'draft':draft(game,cmd.player,cmd.hero);break;
   case 'startLevel':startLevel(game,cmd.selection);break;
   case 'turn':turn(game,cmd.options||{});break;
   case 'playCard':playCard(game,cmd.player,cmd.cardId,cmd.options||{});break;
   case 'nextLevel':nextLevel(game,cmd.selection);break;
   case 'debugSetPosition':{if(game.phase!=='play')throw Error('Debug requires active race');const r=game.runners[cmd.player];if(!r||!Number.isInteger(cmd.position)||cmd.position<0||cmd.position>29)throw Error('Invalid debug position');r.pos=cmd.position;break;}
   case 'debugTrip':{if(game.phase!=='play'||!game.runners[cmd.player])throw Error('Invalid debug trip');game.runners[cmd.player].tripped=true;break;}
   default:throw Error(`Unsupported replay command: ${cmd.type}`);
  }
 }
 return game;
}
export function replayMatches(initialSave,commands,expectedSave){
 return exportSave(replayCommands(initialSave,commands))===expectedSave;
}
