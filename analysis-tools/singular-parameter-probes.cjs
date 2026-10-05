// Read-only source probes supporting SINGULAR-VALUE-GAMEPLAY-REVIEW.md.
// Install under analysis-tools/ and run: node analysis-tools/singular-parameter-probes.cjs
// JSON goes to stdout only; redirect it explicitly if an evidence file is wanted.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'original-game.html'),'utf8'),box={module:{exports:{}}};
vm.runInNewContext([...html.matchAll(/<script>([\s\S]*?)<\/script>/g)][0][1],box,{timeout:1000});
const K=box.module.exports,G=require(path.join(root,'game.js'));
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex');
const constructed='Constructed source/metric probe: not an earned campaign, valid save, browser action or human playtest';
const probe=(description,inputs,result)=>({evidenceKind:constructed,description,inputs,result});
const out={
  reviewDate:'2026-10-05',
  method:'Deterministic read-only Node calculations. No browser access, source writes, time injection or live game mutation.',
  source:{singular:hash('original-game.html'),coherent:hash('game.js'),content:hash('content.js')},
  counts:{evidenceKind:'Source inventory',singularProjects:K.PROJECTS.length,singularActions:Object.keys(K.ACT).length,singularState:Object.keys(K.newState()).length,coherentProjects:G.content.projects.length,coherentEngineering:G.content.engineering.length,coherentExperiments:G.content.experiments.length,coherentWorkloads:G.content.workloads.length,coherentState:Object.keys(G.newGame()).length}
};
function kval(s){return {parameters:K.D.N(s),memoryLimit:K.D.maxN(s),activeParams:K.D.Na(s),capability:K.D.C(s),trainTokensPerSecond:K.D.tokRate(s),servingCapacity:K.D.capacity(s),agentWork:K.D.agentWork(s),revenue:K.D.revenue(s)};}
const k=K.newState();Object.assign(k,{width:1000,layers:4,tokens:1e7,gpus:10,trainFrac:.5});Object.assign(k.flags,{training:true,api:true});k.lr=K.D.lrOpt(k);k.priceLog=Math.log10(K.D.bestPrice(k));
const sizeVariants={base:k,larger:{...k,width:1414,lr:K.D.lrOpt({...k,width:1414})},expertRouting:{...k,moe:8},agentCapacity:{...k,agents:K.D.capacity(k)}};
out.keirSize=Object.fromEntries(Object.entries(sizeVariants).map(([id,s])=>[id,probe('Fixed hardware/data sensitivity; optimal learning rate per size; base price held for comparison',{width:s.width,layers:s.layers,tokens:s.tokens,gpus:s.gpus,trainFrac:s.trainFrac,lr:s.lr,priceLog:s.priceLog,moe:s.moe,agents:s.agents,flags:s.flags},kval(s))]));
function bval(s){const price=K.btcPriceAt(s,s.btc);return {funding:s.funding,holdings:s.btc,price,trend:s.btcTrend,noise:s.btcNoise,markedValue:s.btc*price,markedWealth:s.funding+s.btc*price};}
const b=K.newState();b.flags.btc=true;b.btcTrend=100;b.btcPrice=100;b.funding=1e9;
const before=bval(b);K.ACT.buyBtc(b);const afterBuy=bval(b);K.ACT.sellBtc(b);const afterSellHalf=bval(b);
out.bitcoin=probe('One ordinary engine half-funds buy followed by one half-holdings sale; fixed trend/noise; no ticks',{startingFunding:1e9,startingHoldings:0,trend:100,noise:0,buySlices:20,sellSlices:20,ticks:0},{before,afterBuy,afterSellHalf});
const r=K.newState();r.flags.btc=true;r.btcTrend=100;r.btcPrice=100;r.funding=1e9;
const initial=bval(r);K.ACT.buyBtc(r);for(let i=0;i<40;i++)K.ACT.sellBtc(r);const final=bval(r);
out.bitcoinRoundtrip=probe('Immediate half-funds buy, then 40 ordinary half-holdings sales. Residual coins are valued at the final quote; no market time or noise change. This isolates the original slice-accounting artifact.',{startingFunding:1e9,startingHoldings:0,trend:100,noise:0,buyCount:1,halfSaleCount:40,buySlices:20,sellSlices:20,ticks:0},{initial,final,markedWealthDelta:final.markedWealth-initial.markedWealth,cashDelta:final.funding-initial.funding,residualCoinValue:final.markedValue});
function cval(s){const m=G.metrics(s);return Object.fromEntries(['active','trust','effortCap','fullBank','designRate','designBonus','sharedCapacity','automationRunning','customerCapacity','price','demand','delivered','revenue','netFunding','maintenance','pEff','totalPatches','syndromeRate','decoderRate','decoderOK','slots'].map(key=>[key,m[key]]));}
const c=G.newGame();Object.assign(c,{started:true,module:2,rack:3,staff:6,notebooks:4,reputation:8,pulse:2,drift:.1,service:.9,calibration:.2,automation:4,autoPrice:true,effort:4*120*4});c.done=['feynman','deutsch','nisq','surface','surgery','ancilla'];c.engineering=['storage1','workflow'];c.qualified=['circuit'];
const comboVariants={fullAnalysis:{...c,analysisShare:1},halfAnalysis:{...c,analysisShare:.5},emptyAnalysis:{...c,analysisShare:0},spentBank:{...c,analysisShare:.5,effort:0},storageExpansion:{...c,analysisShare:.5,notebooks:5},rackLimitedBase:{...c,rack:2,analysisShare:.5},unsupportedChip:{...c,module:4,rack:2,analysisShare:.5},rackExpansion:{...c,rack:4,analysisShare:.5},open:{...c,analysisShare:.5,engineering:[...c.engineering,'open']},proprietary:{...c,analysisShare:.5,engineering:[...c.engineering,'proprietary']}};
out.coherentCombos=Object.fromEntries(Object.entries(comboVariants).map(([id,s])=>[id,probe('Metric sensitivity with constructed unlock flags; prerequisite-complete saved-state validity is deliberately not claimed. Compare unsupportedChip with rackLimitedBase; other cases with halfAnalysis.',{module:s.module,rack:s.rack,staff:s.staff,notebooks:s.notebooks,reputation:s.reputation,pulse:s.pulse,drift:s.drift,service:s.service,calibration:s.calibration,automation:s.automation,autoPrice:s.autoPrice,analysisShare:s.analysisShare,effort:s.effort,done:s.done,engineering:s.engineering,qualified:s.qualified},cval(s))]));
const fixture='evidence/coherent-3d/frontier-ending.json',ending=G.parseSave(fs.readFileSync(path.join(root,fixture),'utf8'));
out.optionalEnding={evidenceKind:'Read-only replay of an existing legal engine-generated fixture; not the active Chrome run or a new human playthrough',fixture,fixtureHash:hash(fixture),completedDiscoveries:ending.done.length,ended:ending.ended,missing:G.content.projects.filter(p=>!G.has(ending,p.id)).map(p=>({id:p.id,status:G.projectStatus(ending,p.id)}))};
console.log(JSON.stringify(out,null,2));
