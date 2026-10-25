import test from 'node:test';
import assert from 'node:assert/strict';
import {setup,draft,startLevel,turn,rng} from '../src/engine.mjs';
import {exportSave,importSave,replayCommands,replayMatches} from '../src/persistence.mjs';
function game(){const g=setup(2,17);while(g.phase==='draft')draft(g,g.order[g.pick],g.pool[0]);startLevel(g,[g.teams[0][0],g.teams[1][0]]);return g;}
test('draft state roundtrip preserves pool and cursor',()=>{const g=setup(3,10);const s=exportSave(g);assert.equal(exportSave(importSave(s)),s);});
test('active race roundtrip is byte-identical',()=>{const g=game();turn(g,{roll:2});const s=exportSave(g);assert.equal(exportSave(importSave(s)),s);});
test('restored RNG continues at same cursor',()=>{const g=game();g.random();const h=importSave(exportSave(g));assert.equal(g.random(),h.random());assert.equal(g.random(),h.random());});
test('Set based Pixie activation cache roundtrips',()=>{const g=game();g._pixieSeen=new Set(['a','b']);const h=importSave(exportSave(g));assert.deepEqual([...h._pixieSeen],['a','b']);});
test('replay commands exactly match direct turns',()=>{const g=game();const initial=exportSave(g);const commands=[{type:'turn',options:{roll:2}},{type:'turn',options:{roll:4}}];for(const c of commands)turn(g,c.options);assert.equal(replayMatches(initial,commands,exportSave(g)),true);});
test('replay supports seeded RNG turns',()=>{const g=game();const initial=exportSave(g);turn(g);turn(g);assert.equal(exportSave(replayCommands(initial,[{type:'turn'},{type:'turn'}])),exportSave(g));});
test('reject unsupported version',()=>{const s=JSON.parse(exportSave(game()));s.version=99;assert.throws(()=>importSave(s),/Unsupported/);});
test('reject malformed race state',()=>{const s=JSON.parse(exportSave(game()));s.state.runners[0].pos=999;assert.throws(()=>importSave(s),/Invalid runner/);});
test('reject invalid RNG snapshot',()=>{const s=JSON.parse(exportSave(game()));s.rng.state=-1;assert.throws(()=>importSave(s),/Invalid RNG/);});
test('reject save during active transaction',()=>{const g=game();g._chainTransaction={operation:'test'};assert.throws(()=>exportSave(g),/active transaction/);});
test('reject unsupported replay command',()=>assert.throws(()=>replayCommands(exportSave(game()),[{type:'teleport'}]),/Unsupported replay/));
test('reject arbitrary RNG without state',()=>{const g=game();g.random=()=>0.5;assert.throws(()=>exportSave(g),/RNG/);});
