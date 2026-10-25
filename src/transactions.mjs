// Transaction boundary for one logical displacement batch. This is a
// deterministic snapshot/commit mechanism, not a rollback of card side effects.
export function beginDisplacement(g,changes,{kind='global',active=g.turn}={}){
 if(g.phase!=='play')return null;
 const seen=new Set();
 const snapshot=g.runners.map(r=>({pos:r.pos,place:r.place,tripped:r.tripped}));
 const entries=changes.map(({i,from,to})=>{
  if(!Number.isInteger(i)||i<0||i>=g.count||seen.has(i))throw Error('Invalid or duplicate displacement participant');
  seen.add(i);
  if(snapshot[i].place)throw Error('Finished participant in displacement');
  if(from!==snapshot[i].pos)throw Error('Stale displacement snapshot');
  if(!Number.isInteger(to)||to<0||to>30)throw Error('Invalid destination');
  return {i,from,to};
 });
 entries.sort((a,b)=>((a.i-active+g.count)%g.count)-((b.i-active+g.count)%g.count));
 return {kind,active,snapshot,entries,committed:false};
}
export function commitDisplacement(g,tx){
 if(!tx||tx.committed)throw Error('Displacement already committed or invalid');
 if(g.phase!=='play')return false;
 for(const entry of tx.entries){
  if(g.runners[entry.i].pos!==entry.from||g.runners[entry.i].place!==tx.snapshot[entry.i].place)
   throw Error('Displacement transaction conflict');
 }
 for(const {i,to} of tx.entries)g.runners[i].pos=to;
 tx.committed=true;
 g.transactionHistory??=[];
 g.transactionHistory.push({kind:tx.kind,active:tx.active,entries:tx.entries.map(e=>({...e}))});
 return true;
}
// Detect cycles by the full pending-event signature and relevant mutable state.
// An ambiguous cycle is reported, never assigned an invented game result.
export function resolutionSignature(g,event,pending){
 return JSON.stringify({event:[event.type,event.runner,event.label],phase:g.phase,turn:g.turn,
  runners:g.runners.map(r=>[r.pos,r.place,r.tripped,r.nextBonus,r.hand.map(c=>c.id||c.name)]),
  places:g.places,ongoing:g.ongoing,queue:pending.map(e=>[e.type,e.runner,e.label])});
}
