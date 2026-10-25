import test from 'node:test';
import assert from 'node:assert/strict';
import {setup,draft,startLevel,swap,globalMove} from '../src/engine.mjs';
function game(names){const g=setup(names.length,42);while(g.phase==='draft')draft(g,g.order[g.pick],g.pool[0]);startLevel(g,g.teams.map(t=>t[0]));names.forEach((hero,i)=>g.runners[i].hero=hero);return g;}
test('global displacement commits each hero once, including Gnat sharing a carrier',()=>{
 const g=game(['BOBA','GNAT','VESPERA']);g.runners.forEach(r=>r.pos=10);
 globalMove(g,-2);
 assert.deepEqual(g.runners.map(r=>r.pos),[8,8,8]);
 assert.equal(g.history.filter(x=>x.type==='move'&&x.global).length,3);
 assert.equal(g.history.filter(x=>x.piggyback).length,0);
});
test('global movement resolves simultaneous finish in active clockwise order',()=>{
 const g=game(['BOBA','GNAT','WARP']);g.turn=2;g.runners.forEach(r=>r.pos=29);
 globalMove(g,2);assert.equal(g.phase,'results');assert.deepEqual(g.places,[2,0]);
});
test('teleport onto Gronk displaces arriving hero before destination chest',()=>{
 const g=game(['WARP','BOBA','GRONK']);g.runners[0].pos=2;g.runners[1].pos=3;g.runners[2].pos=3;
 swap(g,0,1);assert.equal(g.runners[0].pos,2);assert.equal(g.runners[0].hand.length,0);
 assert.ok((g.resolutionTrace||[]).some(s=>s.includes('GRONK atomic excludes')));
});
test('teleport with a third-party observer never triggers passing power',()=>{
 const g=game(['WARP','BOBA','CHIRON']);g.runners[0].pos=2;g.runners[1].pos=8;g.runners[2].pos=5;
 swap(g,0,1);assert.deepEqual(g.runners.map(r=>r.pos),[8,2,5]);
 assert.equal(g.history.filter(x=>x.ability==='CHIRON PASS').length,0);
});
