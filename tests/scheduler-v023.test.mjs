import test from 'node:test';
import assert from 'node:assert/strict';
import {createResolution} from '../src/resolution.mjs';
import {setup,draft,startLevel,move,swap,globalMove} from '../src/engine.mjs';
function game(names){const g=setup(2,4);g.phase='select';g.teams=names.map(n=>[n]);startLevel(g,names);return g;}
test('nested events use one scheduler and respect ability before destination',()=>{
 const g=game(['PIXIE','GRONK']),seen=[];const q=createResolution(g);
 q.enqueue('ability',0,()=>{seen.push('outer');const nested=createResolution(g);assert.equal(nested,q);nested.enqueue('destination',0,()=>seen.push('landing'));nested.enqueue('ability',1,()=>seen.push('reaction'));nested.drain();seen.push('outer-return');});
 q.drain();assert.deepEqual(seen,['outer','outer-return','reaction','landing']);assert.equal(g._scheduler,undefined);
});
test('a nested reaction is processed before a queued landing',()=>{
 const g=game(['GNAT','GRONK']),seen=[];const q=createResolution(g);
 q.enqueue('destination',0,()=>seen.push('landing'));
 q.enqueue('ability',1,()=>{seen.push('first');createResolution(g).enqueue('ability',0,()=>seen.push('second'));});
 q.drain();assert.deepEqual(seen,['first','second','landing']);
});
test('scheduler does not duplicate resolution trace for nested drain',()=>{
 const g=game(['GNAT','GRONK']);const q=createResolution(g);
 q.enqueue('ability',0,()=>{createResolution(g).enqueue('ability',1,()=>{});createResolution(g).drain();});
 q.drain();assert.equal(g.resolutionTrace.filter(x=>x.startsWith('RUN')).length,2);
});
test('Pixie and Gronk feedback loop is finite and flagged for adjudication',()=>{
 const g=game(['PIXIE','GRONK']);g.runners[0].pos=5;g.runners[1].pos=7;
 move(g,0,2,{magical:true});
 assert.ok(g.runners[0].pos>=0&&g.runners[0].pos<=30);
 assert.ok(g.unresolved.includes('repeated-movement-state'));
 assert.ok(g.history.length<30);
});
test('teleport and global dispatch remain available under scheduler',()=>{
 const g=game(['GNAT','GRONK']);g.runners[0].pos=4;g.runners[1].pos=8;
 assert.equal(swap(g,0,1),true);assert.equal(g.runners[0].pos,8);assert.equal(g.runners[1].pos,4);
 assert.equal(globalMove(g,-2),true);assert.equal(g.runners[0].pos,6);assert.equal(g.runners[1].pos,2);
});
