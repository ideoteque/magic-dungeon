// Root-action rollback on unexpected exceptions. Ambiguous rules/cycles are NOT exceptions:
// their valid prior events remain committed and are reported for adjudication.
// RNG closures and external side effects cannot be rewound; use injected deterministic rolls
// for reproducible tests. Scheduler callbacks are excluded from snapshots.
const FIELDS=['phase','turn','runners','places','scores','log','history','unresolved','dispatchHistory','transactionHistory','resolutionTrace','chest','altar','discard','ongoing','_pendingPiggybackFinish','_activationId','_pixieSeen','_globalEvent'];
export function withChainTransaction(g,operation,fn){
 if(g._chainTransaction)return fn();
 const snapshot=new Map(FIELDS.map(k=>[k,Object.hasOwn(g,k)?{present:true,value:structuredClone(g[k])}:{present:false}]));
 const randomRef=g.random;
 const rngState=typeof randomRef?.getState==='function'?randomRef.getState():undefined;
 g._chainTransaction={operation};
 try{return fn();}
 catch(error){
  for(const [k,v] of snapshot){if(v.present)g[k]=v.value;else delete g[k];}
  // Restore both the original generator reference and its exact cursor.
  g.random=randomRef;
  if(rngState!==undefined&&typeof randomRef.setState==='function')randomRef.setState(rngState);
  // The caller receives the error; the restored game state is safe to retry.
  throw error;
 }finally{delete g._chainTransaction;}
}
