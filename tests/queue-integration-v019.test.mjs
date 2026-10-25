import test from 'node:test';
import assert from 'node:assert/strict';
import {setup,draft,startLevel,resolveDestinations,globalMove,swap,move} from '../src/engine.mjs';
function game(count=2){const g=setup(count,37);while(g.phase==='draft')draft(g,g.order[g.pick],g.pool[0]);startLevel(g,g.teams.map(t=>t[0]));return g;}
test('queued destination cancels when hero moved away',()=>{const g=game();g.runners[0].pos=4;const result=resolveDestinations(g,[{i:0,to:3}]);assert.match(result.trace.join(' '),/CANCEL destination/);assert.equal(g.runners[0].hand.length,0);});
test('queued chest destination draws one card when still present',()=>{const g=game();g.runners[0].pos=3;const result=resolveDestinations(g,[{i:0,to:3}]);assert.match(result.trace.join(' '),/RUN destination/);assert.equal(g.runners[0].hand.length,1);});
test('global movement destinations are queued and traceable',()=>{const g=game();g.runners[0].pos=2;g.runners[1].pos=5;globalMove(g,1);assert.equal(g.runners[0].pos,3);assert.equal(g.runners[0].hand.length,1);assert.ok(g.resolutionTrace.some(x=>x.includes('destination 0@3')));});
test('ordinary movement uses destination queue',()=>{const g=game();move(g,0,3);assert.equal(g.runners[0].hand.length,1);assert.ok(g.resolutionTrace.some(x=>x.includes('destination 0@3')));});
