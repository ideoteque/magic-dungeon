import test from 'node:test';
import assert from 'node:assert/strict';
import {setup,draft,startLevel,move,swap,turn} from '../src/engine.mjs';
function game(names){const g=setup(names.length,42);while(g.phase==='draft')draft(g,g.order[g.pick],g.pool[0]);startLevel(g,g.teams.map(t=>t[0]));names.forEach((name,i)=>g.runners[i].hero=name);return g;}
test('Gnat rides carrier without extra chest draw',()=>{const g=game(['BOBA','GNAT']);g.runners[0].pos=2;g.runners[1].pos=2;move(g,0,1);assert.deepEqual(g.runners.map(r=>r.pos),[3,3]);assert.equal(g.runners[0].hand.length,1);assert.equal(g.runners[1].hand.length,0);});
test('Gnat does not ride when carrier was not sharing origin',()=>{const g=game(['BOBA','GNAT']);g.runners[1].pos=2;move(g,0,3);assert.equal(g.runners[1].pos,2);});
test('Pixie reacts to a Chiron power activation',()=>{const g=game(['CHIRON','BOBA','PIXIE']);g.runners[1].pos=3;move(g,0,5);assert.equal(g.runners[2].pos,1);});
test('Pixie does not self-trigger endlessly',()=>{const g=game(['PIXIE','BOBA']);move(g,0,3);assert.equal(g.runners[0].pos,3);});
test('Warp simultaneous swap avoids passing effects',()=>{const g=game(['WARP','CHIRON','BOBA']);g.runners[0].pos=1;g.runners[1].pos=6;g.runners[2].pos=3;assert.equal(swap(g,0,1),true);assert.equal(g.runners[0].pos,6);assert.equal(g.runners[1].pos,1);assert.equal(g.runners[2].pos,3);});
test('Warp action skips rolling and changes turn',()=>{const g=game(['WARP','BOBA']);g.runners[1].pos=9;turn(g,{action:{type:'phaseShift',target:1}});assert.equal(g.runners[0].pos,9);assert.equal(g.runners[1].pos,0);assert.equal(g.turn,1);});
test('Gnat and carrier finish together in turn order',()=>{const g=game(['BOBA','GNAT']);g.runners[0].pos=29;g.runners[1].pos=29;move(g,0,2);assert.equal(g.phase,'results');assert.deepEqual(g.places,[0,1]);});
