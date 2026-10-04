const test=require('node:test');
const assert=require('node:assert/strict');
const G=require('../game.js');
const {campusPlay}=require('./campus-playthrough.cjs');
for(const policy of ['local','bulk'])test(`The ${policy} campus policy makes real experiments/procurement decisions and legally finishes`,()=>{
  const {result,report}=campusPlay(policy),s=result.state;
  assert.equal(s.ended,true,'Deeper activities must preserve an attainable main campaign');assert.ok(s.completed.includes('dynamics'));assert.equal(s.objectiveResults.length,6,'All six frontier goals must be reachable');assert.equal(s.precisionResults.length,6,'All six fresh precision requests must be fulfillable');assert.ok(report.orders.length>0);assert.deepEqual(report.modern.sort(),['adaptive2026','controller2026','state-readiness'].sort());assert.ok(report.campusCounts.taskBusy>0);assert.ok(report.campusCounts.longestNoAction>0);assert.deepEqual(G.parseSave(G.serialize(s)),s);assert.equal(s.endingRecord.workload,'dynamics');
  for(const snapshot of Object.values(result.snapshots))assert.deepEqual(G.parseSave(G.serialize(snapshot)),snapshot,'Intermediate earned state must restore, including captured goals and deliveries');
});
