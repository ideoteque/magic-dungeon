import test from 'node:test';
import assert from 'node:assert/strict';
import {setup,draft,startLevel,resolveAttacks} from '../src/engine.mjs';
import {createResolution,clockwiseOrder} from '../src/resolution.mjs';
function ready(n=3){const g=setup(n,44);while(g.phase==='draft')draft(g,g.order[g.pick],g.pool[0]);startLevel(g,g.teams.map(t=>t[0]));return g;}
test('clockwise priority begins at active player',()=>assert.deepEqual(clockwiseOrder(4,2,[0,1,2,3]),[2,3,0,1]));
test('reactions precede consequences across all eligible targets',()=>{
 const g=ready();g.turn=2;g.runners[0].pos=10;g.runners[1].pos=10;g.runners[2].pos=10;
 g.runners[0].hand=[{id:'shield0',name:'Small Shield',timing:'Reaction'}];
 const r=resolveAttacks(g,2,'Fire Wave',[0,1],[0]);
 assert.equal(g.runners[0].pos,10);assert.equal(g.runners[1].pos,7);
 assert.deepEqual(r.trace.slice(0,2),['RUN Fire Wave: shield 0','RUN Fire Wave: shield 1']);
 assert.equal(g.runners[0].hand.length,0);
});
test('pending destination is cancelled after movement away',()=>{
 const g=ready(2),r=createResolution(g);g.runners[0].pos=3;let triggered=0;
 r.enqueue('destination',0,()=>triggered++,{label:'chest at 3',guard:()=>g.runners[0].pos===3});
 r.enqueue('ability',1,()=>{g.runners[0].pos=2;},{label:'forced move'});
 assert.match(r.drain().trace.join(' '),/CANCEL chest at 3/);assert.equal(triggered,0);
});
test('new reaction inserted during resolution precedes pending destinations',()=>{
 const g=ready(2),r=createResolution(g),order=[];
 r.enqueue('destination',0,()=>order.push('destination'));
 r.enqueue('ability',0,()=>{order.push('ability');r.enqueue('reaction',1,()=>order.push('reaction'));});
 r.drain();assert.deepEqual(order,['ability','reaction','destination']);
});
test('repeated relevant event state is flagged, not silently looped',()=>{
 const g=ready(2),r=createResolution(g);let calls=0;
 r.enqueue('ability',0,()=>{calls++;r.enqueue('ability',0,()=>{calls++;},{label:'repeat'});},{label:'repeat'});
 r.drain();assert.equal(calls,1);assert.ok(g.unresolved.includes('repeated-resolution-state'));
});
test('identical event names with changing game state are not mistaken for cycles',()=>{
 const g=ready(2),r=createResolution(g);let calls=0;
 r.enqueue('ability',0,()=>{calls++;g.runners[0].pos++;r.enqueue('ability',0,()=>{calls++;g.runners[0].pos++;},{label:'move'});},{label:'move'});
 r.drain();assert.equal(calls,2);
});
