import test from 'node:test';
import assert from 'node:assert/strict';
import {setup,draft,startLevel,move} from '../src/engine.mjs';
function game(names){const g=setup(names.length,42);while(g.phase==='draft')draft(g,g.order[g.pick],g.pool[0]);startLevel(g,g.teams.map(t=>t[0]));names.forEach((name,i)=>g.runners[i].hero=name);return g;}
test('Chiron passes and knocks back two',()=>{const g=game(['CHIRON','BOBA']);g.runners[1].pos=3;move(g,0,5);assert.equal(g.runners[1].pos,1);assert.equal(g.runners[0].pos,5);});
test('Passing requires ending ahead',()=>{const g=game(['CHIRON','BOBA']);g.runners[1].pos=5;move(g,0,5);assert.equal(g.runners[1].pos,5);});
test('Grok passing knocks back one',()=>{const g=game(['GROK','BOBA']);g.runners[1].pos=3;move(g,0,5);assert.equal(g.runners[1].pos,2);});
test('Gronk ejects arrival; START exempt',()=>{const g=game(['GRONK','BOBA']);g.runners[0].pos=5;g.runners[1].pos=4;move(g,1,1);assert.equal(g.runners[1].pos,4);g.runners[0].pos=0;g.runners[1].pos=0;move(g,1,0);assert.equal(g.runners[1].pos,0);});
test('Gronk entering occupied space ejects occupants',()=>{const g=game(['GRONK','BOBA']);g.runners[1].pos=5;move(g,0,5);assert.equal(g.runners[1].pos,4);});
test('Thorin Brewburn slams and trips on arrival',()=>{const g=game(['THORIN BREWBURN','BOBA']);g.runners[1].pos=5;move(g,0,5);assert.equal(g.runners[1].pos,2);assert.equal(g.runners[1].tripped,true);});
test('Vespera forced backwards drags only nearby heroes',()=>{const g=game(['VESPERA','BOBA','PIP']);g.runners[0].pos=10;g.runners[1].pos=12;g.runners[2].pos=18;move(g,0,-2,{magical:true,forced:true});assert.equal(g.runners[0].pos,8);assert.equal(g.runners[1].pos,10);assert.equal(g.runners[2].pos,18);});
test('Vespera voluntary backward move does not drag',()=>{const g=game(['VESPERA','BOBA']);g.runners[0].pos=10;g.runners[1].pos=12;move(g,0,-2,{magical:true});assert.equal(g.runners[1].pos,12);});
