import {resolutionSignature} from './transactions.mjs';
// One reentrancy-safe scheduler per game. Nested enqueues join the active drain.
export function clockwiseOrder(count,active,indices){return [...indices].sort((a,b)=>((a-active+count)%count)-((b-active+count)%count));}
export function createResolution(g,{active=g.turn}={}){
 if(g._scheduler)return g._scheduler;
 const queue=[];let nextId=0,draining=false;const trace=[];const seen=new Set();
 const rank={reaction:0,ability:1,destination:2};
 function enqueue(type,runner,run,{guard=null,label=type}={}){
  if(!(type in rank))throw Error(`Unknown resolution phase: ${type}`);
  const item={id:++nextId,type,runner,run,guard,label};queue.push(item);return item.id;
 }
 function drain({maxEvents=256}={}){
  if(draining)return {trace:[],steps:0,deferred:true,unresolved:g.unresolved};
  draining=true;let steps=0;const start=trace.length;
  try{
   while(queue.length){
    if(++steps>maxEvents){g.unresolved.push('resolution-queue-limit');trace.push('STOP: queue limit; needs adjudication');queue.length=0;break;}
    queue.sort((a,b)=>rank[a.type]-rank[b.type]||((a.runner-active+g.count)%g.count)-((b.runner-active+g.count)%g.count)||a.id-b.id);
    const event=queue.shift();
    if(event.guard&&!event.guard()){trace.push(`CANCEL ${event.label}`);continue;}
    const state=resolutionSignature(g,event,queue);
    if(seen.has(state)){if(!g.unresolved.includes('repeated-resolution-state'))g.unresolved.push('repeated-resolution-state');trace.push(`CYCLE ${event.label}`);queue.length=0;break;}
    seen.add(state);trace.push(`RUN ${event.label}`);event.run();
   }
  }finally{draining=false;delete g._scheduler;g.resolutionTrace=[...(g.resolutionTrace||[]),...trace];}
  return {trace:trace.slice(start),steps,unresolved:g.unresolved};
 }
 const scheduler={enqueue,drain,trace,get pending(){return queue.length;},get draining(){return draining;}};
 g._scheduler=scheduler;return scheduler;
}
