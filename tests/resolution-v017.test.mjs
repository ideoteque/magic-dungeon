import test from 'node:test';
import assert from 'node:assert/strict';
import {setup,draft,startLevel,swap,globalMove} from '../src/engine.mjs';
function game(names){const g=setup(names.length,42);while(g.phase==='draft')draft(g,g.order[g.pick],g.pool[0]);startLevel(g,g.teams.map(t=>t[0]));names.forEach((name,i)=>g.runners[i].hero=name);return g;}
test('global Vespera does not double-drag participants',()=>{const g=game(['VESPERA','BOBA','GNAT']);g.runners.forEach((r,i)=>r.pos=10+i);globalMove(g,-2);assert.deepEqual(g.runners.map(r=>r.pos),[8,9,10]);assert.equal(g.unresolved.includes('global-vespera-priority'),false);});
test('global Vespera movement at START clamps without duplicate',()=>{const g=game(['VESPERA','BOBA']);g.runners[0].pos=1;g.runners[1].pos=2;globalMove(g,-3);assert.deepEqual(g.runners.map(r=>r.pos),[0,0]);});
test('Warp simultaneous finish ranks active player first',()=>{const g=game(['WARP','BOBA','GNAT']);g.turn=1;g.runners[0].pos=30;g.runners[1].pos=30;swap(g,0,1);assert.deepEqual(g.places,[1,0]);assert.equal(g.phase,'results');});
test('Warp destination chain does not resolve stale landing tile after Gronk ejection',()=>{const g=game(['WARP','BOBA','GRONK']);g.runners[0].pos=2;g.runners[1].pos=3;g.runners[2].pos=3;swap(g,0,1);assert.equal(g.runners[0].pos,2);assert.equal(g.runners[0].hand.length,0);});
