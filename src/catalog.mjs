// Card inventory transcribed from GDD Master Specifications sections 7 and 8.
export const chestDefinitions = [
[['Speed Potion',4,'Action'],['Small Shield',4,'Reaction'],['Torchlight',5,'Action']],
[['Slick Oil',4,'Action'],['Banana Peel',5,'Action'],['Illusory Wall',4,'Action']],
[['Prison Chains',4,'Action'],['Force Scroll',5,'Action'],['Cursed Chest',4,'Action']],
[['Warp Pearl',4,'Action'],['Fire Wave',5,'Action'],['Dragon Sacrifice',4,'Action']]
];
export const altarDefinitions = [
[['Ancient Blessing',2,'Direct'],['Shared Loot',2,'Direct'],['Hasty Mists',1,'Ongoing'],['Mystic Altar',2,'d20'],['Catacomb Echoes',2,'d20']],
[['Root Quake',2,'Direct'],['Gust of Wind',1,'Direct'],['Slippery Moss',2,'Ongoing'],['Forest Taunt',2,'d20'],['Cave-In',2,'d20']],
[['Public Execution',2,'Direct'],['Shadow Theft',1,'Direct'],['Arcane Silence',2,'Ongoing'],["Gaoler's Trial",2,'d20'],['Shadow Ritual',2,'d20']],
[['Dragon Swap',2,'Direct'],['Molten Gold',1,'Direct'],['The Dragon Awakes',2,'Ongoing'],["Dragon's Breath",2,'d20'],['Volcanic Fury',2,'d20']]
];
export const heroes=['GROK','SIR GALHAD','THORIN BREWBURN','CHIRON','GRONK','OLARIN','MASTER YOD-AH','WARP','VESPERA','IGNIS','THORIN GREEDFOOT','SLINK','MORDER','GNAT','CRACKLES','INIGO','BOBA','PIXIE','THE ORACLE','PIP'];
export function expand(defs,level,type){return defs[level].flatMap(([name,count,timing])=>Array.from({length:count},(_,copy)=>({id:`${type}-${level+1}-${name.toLowerCase().replace(/[^a-z]+/g,'-')}-${copy+1}`,name,level:level+1,type,timing})));}
export const allChest=chestDefinitions.flatMap((_,i)=>expand(chestDefinitions,i,'Chest'));
export const allAltar=altarDefinitions.flatMap((_,i)=>expand(altarDefinitions,i,'Altar'));
