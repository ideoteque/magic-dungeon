import test from 'node:test';
import assert from 'node:assert/strict';
import {setup,draft,startLevel,move} from '../src/engine.mjs';
function game(names){const g=setup(names.length,42);while(g.phase==='draft')draft(g,g.order[g.pick],g.pool[0]);startLevel(g,g.teams.map(t=>t[0]));names.forEach((name,i)=>g.runners[i].hero=name);return g;}
test('Chiron passing reaction is a first-class queued ability',()=>{const g=game(['CHIRON','BOBA']);g.runners[1].pos=3;move(g,0,5);assert.equal(g.runners[1].pos,1);assert.ok(g.resolutionTrace.some(x=>x.includes('RUN CHIRON pass 1')));});
test('Vespera forced drag queues its reaction and chained movement',()=>{const g=game(['VESPERA','BOBA']);g.runners[0].pos=10;g.runners[1].pos=12;move(g,0,-2,{magical:true,forced:true});assert.equal(g.runners[1].pos,10);assert.ok(g.resolutionTrace.some(x=>x.includes('RUN VESPERA drag 1')));});
test('Gronk exclusion queues a reaction and cancels original destination',()=>{const g=game(['BOBA','GRONK']);g.runners[0].pos=2;g.runners[1].pos=3;move(g,0,1);assert.equal(g.runners[0].pos,2);assert.ok(g.resolutionTrace.some(x=>x.includes('RUN GRONK excludes 0')));assert.equal(g.runners[0].hand.length,0);});
test('Thorin slam queues before destination tile and trips victim',()=>{const g=game(['THORIN BREWBURN','BOBA']);g.runners[1].pos=5;move(g,0,5);assert.equal(g.runners[1].pos,2);assert.equal(g.runners[1].tripped,true);assert.ok(g.resolutionTrace.some(x=>x.includes('RUN THORIN slam 1')));});
test('Gronk entering occupied tile queues ejection',()=>{const g=game(['GRONK','BOBA']);g.runners[1].pos=5;move(g,0,5);assert.equal(g.runners[1].pos,4);assert.ok(g.resolutionTrace.some(x=>x.includes('RUN GRONK eject 1')));});
test('Vespera uses pre-move proximity even when victim subsequently moves',()=>{const g=game(['VESPERA','BOBA','PIP']);g.runners[0].pos=10;g.runners[1].pos=13;g.runners[2].pos=14;move(g,0,-2,{magical:true,forced:true});assert.deepEqual(g.runners.map(r=>r.pos),[8,11,14]);});
