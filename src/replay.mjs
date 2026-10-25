import {exportSave,importSave,replayCommands} from './persistence.mjs';
export const REPLAY_VERSION=1;
const TYPES=new Set(['draft','startLevel','turn','playCard','nextLevel','debugSetPosition','debugTrip']);
function checkCommand(command){
 if(!command||typeof command!=='object'||Array.isArray(command)||!TYPES.has(command.type))throw Error('Unsupported journal command');
 if(!Object.values(command).every(v=>typeof v!=='function'))throw Error('Non-serializable command');
}
export function createJournal(game){return {format:'magic-dungeon-replay',version:REPLAY_VERSION,initial:exportSave(game),commands:[],checkpoints:[exportSave(game)]};}
export function recordCommand(journal,game,command,perform){
 checkCommand(command);
 if(!journal||journal.format!=='magic-dungeon-replay')throw Error('Invalid journal');
 const before=exportSave(game);
 const outcome=perform();
 const after=exportSave(game);
 if(after!==before){journal.commands.push(structuredClone(command));journal.checkpoints.push(after);}
 return outcome;
}
export function exportReplay(journal){
 validateReplay(journal);
 return JSON.stringify(journal);
}
export function validateReplay(raw){
 const journal=typeof raw==='string'?JSON.parse(raw):raw;
 if(!journal||journal.format!=='magic-dungeon-replay'||journal.version!==REPLAY_VERSION||!Array.isArray(journal.commands)||!Array.isArray(journal.checkpoints)||journal.checkpoints.length!==journal.commands.length+1)throw Error('Invalid replay format');
 importSave(journal.initial);
 if(journal.checkpoints[0]!==journal.initial)throw Error('Replay initial checkpoint mismatch');
 for(const cmd of journal.commands)checkCommand(cmd);
 for(let i=0;i<journal.commands.length;i++){
  const state=exportSave(replayCommands(journal.initial,journal.commands.slice(0,i+1)));
  if(state!==journal.checkpoints[i+1])throw Error(`Replay divergence at step ${i+1}`);
 }
 return journal;
}
export function replayStep(journal,step){
 if(!Number.isInteger(step)||step<0||step>journal.commands.length)throw Error('Invalid replay step');
 // Re-execute commands instead of merely displaying checkpoints.
 const actual=exportSave(replayCommands(journal.initial,journal.commands.slice(0,step)));
 if(actual!==journal.checkpoints[step])throw Error(`Replay divergence at step ${step}`);
 return importSave(actual);
}
