import test from 'node:test';
import assert from 'node:assert/strict';
import {setup,draft,startLevel,move,swap,globalMove} from '../src/engine.mjs';
function game(names){const g=setup(names.length,42);while(g.phase==='draft')draft(g,g.order[g.pick],g.pool[0]);startLevel(g,g.teams.map(t=>t[0]));names.forEach((name,i)=>g.runners[i].hero=name);return g;}
test('global movement applies to both carrier and Gnat once',()=>{const g=game(['BOBA','GNAT']);g.runners[0].pos=10;g.runners[1].pos=10;globalMove(g,-2);assert.deepEqual(g.runners.map(r=>r.pos),[8,8]);assert.equal(g.history.filter(x=>x.type==='move'&&x.runner===1).length,1);});
test('global movement snapshots all starting positions',()=>{const g=game(['BOBA','GNAT','PIXIE']);g.runners.forEach((r,i)=>r.pos=16+i);globalMove(g,-2);assert.deepEqual(g.runners.map(r=>r.pos),[14,15,16]);});
test('global movement clamps backward at START',()=>{const g=game(['BOBA','GNAT']);g.runners[0].pos=1;g.runners[1].pos=0;globalMove(g,-3);assert.deepEqual(g.runners.map(r=>r.pos),[0,0]);});
test('global movement does not duplicate piggyback landing chest',()=>{const g=game(['BOBA','GNAT']);g.runners[0].pos=5;g.runners[1].pos=5;globalMove(g,-2);assert.equal(g.runners[0].hand.length,1);assert.equal(g.runners[1].hand.length,1);});
test('Warp does not pass through or disturb third runner',()=>{const g=game(['WARP','CHIRON','BOBA']);g.runners[0].pos=2;g.runners[1].pos=9;g.runners[2].pos=5;swap(g,0,1);assert.equal(g.runners[2].pos,5);assert.equal(g.history.some(x=>x.type==='move'&&x.runner===2),false);});
test('Warp does not create fake crossing pass activation',()=>{const g=game(['WARP','CHIRON','PIXIE']);g.runners[0].pos=2;g.runners[1].pos=9;g.runners[2].pos=5;swap(g,0,1);assert.equal(g.history.filter(x=>x.type==='ability'&&x.ability?.includes('PASS')).length,0);});
test('Pixie receives one move per distinct power activation',()=>{const g=game(['CHIRON','BOBA','PIXIE']);g.runners[1].pos=3;move(g,0,5);assert.equal(g.history.filter(x=>x.type==='move'&&x.runner===2).length,1);});
test('separate movement roots do not share cycle detection state',()=>{const g=game(['BOBA','GNAT']);move(g,0,1);move(g,0,1);assert.equal(g.runners[0].pos,2);assert.equal(g.unresolved.includes('repeated-movement-state'),false);});
test('global finishing respects active-player clockwise order',()=>{const g=game(['BOBA','GNAT','PIXIE']);g.turn=2;g.runners.forEach(r=>r.pos=29);globalMove(g,1);assert.deepEqual(g.places,[2,0]);assert.equal(g.phase,'results');});
