import test from 'node:test';
import assert from 'node:assert/strict';
import {setup,draft,startLevel,turn,playCard} from '../src/engine.mjs';
import {exportSave,importSave} from '../src/persistence.mjs';
import {createJournal,recordCommand,exportReplay,validateReplay,replayStep} from '../src/replay.mjs';
function record(j,g,cmd,fn){return recordCommand(j,g,cmd,fn);}
test('full automatic draft and start race journal replays every checkpoint',()=>{
 const g=setup(2,7),j=createJournal(g);
 while(g.phase==='draft'){const player=g.order[g.pick],hero=g.pool[0];record(j,g,{type:'draft',player,hero},()=>draft(g,player,hero));}
 const selection=g.teams.map(t=>t[0]);record(j,g,{type:'startLevel',selection},()=>startLevel(g,selection));
 assert.equal(validateReplay(exportReplay(j)).commands.length,j.commands.length);
 assert.equal(exportSave(replayStep(j,j.commands.length)),exportSave(g));
});
test('UI preview RNG consumption remains deterministic in recorded turn',()=>{
 const g=setup(2,4),j=createJournal(g);
 while(g.phase==='draft'){const player=g.order[g.pick],hero=g.pool[0];record(j,g,{type:'draft',player,hero},()=>draft(g,player,hero));}
 const selection=g.teams.map(t=>t[0]);record(j,g,{type:'startLevel',selection},()=>startLevel(g,selection));
 const roll=1+Math.floor(g.random()*6);
 record(j,g,{type:'turn',options:{roll},rngDraws:1},()=>turn(g,{roll}));
 assert.equal(exportSave(replayStep(j,j.commands.length)),exportSave(g));
});
test('debug actions are deterministic and replayable',()=>{
 const g=setup(2,9),j=createJournal(g);
 while(g.phase==='draft'){const player=g.order[g.pick],hero=g.pool[0];record(j,g,{type:'draft',player,hero},()=>draft(g,player,hero));}
 const selection=g.teams.map(t=>t[0]);record(j,g,{type:'startLevel',selection},()=>startLevel(g,selection));
 record(j,g,{type:'debugSetPosition',player:0,position:13},()=>{g.runners[0].pos=13;});
 record(j,g,{type:'debugTrip',player:0},()=>{g.runners[0].tripped=true;});
 assert.equal(exportSave(replayStep(j,j.commands.length)),exportSave(g));
});
test('replay rejects tampered checkpoint',()=>{const g=setup(2,1),j=createJournal(g);j.checkpoints[0]='bad';assert.throws(()=>validateReplay(j),/checkpoint mismatch/);});
test('replay rejects unsupported command',()=>{const g=setup(2,1),j=createJournal(g);assert.throws(()=>record(j,g,{type:'magic'},()=>{}),/Unsupported/);});
test('replay rejects invalid step',()=>{const j=createJournal(setup(2,1));assert.throws(()=>replayStep(j,2),/Invalid replay step/);});
test('replay does not record no-op commands',()=>{const g=setup(2,1),j=createJournal(g);record(j,g,{type:'debugTrip',player:0},()=>{});assert.equal(j.commands.length,0);});
test('recording does not commit a command after failed action',()=>{const g=setup(2,1),j=createJournal(g);assert.throws(()=>record(j,g,{type:'draft',player:0,hero:'none'},()=>draft(g,0,'none')));assert.equal(j.commands.length,0);});
test('imported journal is compatible with step replay',()=>{const g=setup(2,1),j=createJournal(g);const copy=validateReplay(JSON.parse(exportReplay(j)));assert.equal(exportSave(replayStep(copy,0)),exportSave(importSave(j.initial)));});
