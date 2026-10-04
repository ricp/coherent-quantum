// Accelerated engine playthrough using legal actions and normal resource costs.
// This policy is an audit scenario, not a claim of an optimal human strategy.
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'original-game.html'),'utf8');
const box={module:{exports:{}}};
vm.runInNewContext([...html.matchAll(/<script>([\s\S]*?)<\/script>/g)][0][1],box);
const {newState,D,COST,ACT,tick,buyProject,visibleProjects}=box.module.exports;
const s=newState(),events=[],fixtures={};
const excluded=new Set(['closed','race','latent']);
function milestone(id){events.push({seconds:s.t,id,era:s.era,parameters:D.N(s),capability:D.C(s),funding:s.funding});}
for(let step=0;step<144000&&!s.ended;step++) {
  s.lr=D.lrOpt(s)+Math.log10(0.9); s.damp=s.flags.selfModel?0.4:0;
  s.trainFrac=s.flags.agents?0.25:0.65; s.solarFrac=0.8;
  if(s.flags.api&&!s.flags.autoPrice) s.priceLog=Math.log10(Math.max(1e-6,D.bestPrice(s)));
  if(step%2===0){
    for(let i=0;i<10&&s.width<100;i++)ACT.neuron(s);
    if(s.flags.layers&&s.layers<12&&s.funding>COST.layer(s)*4)ACT.layer(s);
    for(let i=0;i<20;i++){
      const projects=visibleProjects(s).filter(p=>!excluded.has(p.id));
      const largest=Math.max(1000,...projects.map(p=>p.cost.ins||0));
      const target=Math.ceil(largest/(1000*s.capMult));
      while(D.credFree(s)>=1&&s.notebooks<target)ACT.notebook(s);
      // Preserve a small reserve because staff cannot be unassigned when a
      // newly unlocked advance requires more insight storage.
      if(D.credFree(s)>=4)ACT.researcher(s);
      const p=projects.find(p=>buyProject(s,p.id)); if(!p)break;
      milestone(p.id);
    }
    if(s.flags.press){const next=Math.pow(1.15,s.pressLevel+1)/D.allowance(s);
      if(next<0.8&&s.funding>COST.press(s)*5)ACT.press(s);}
    if(!s.flags.autoGrow){if(s.grads<30&&s.funding>COST.grad(s)*4)ACT.grad(s);
      if(s.flags.labs&&s.labs<10&&s.funding>COST.lab(s)*5)ACT.lab(s);}
    if(!s.flags.gpus&&s.funding>COST.ram(s)*5)ACT.ram(s);
    if(s.flags.gpus&&s.funding>COST.gpu(s)*10)ACT.gpu(s);
    if(s.flags.dcs&&s.funding>COST.dc(s)*8)ACT.dc(s);
    if(s.flags.crawlers&&s.web<3e12&&s.funding>COST.crawler(s)*10)ACT.crawler(s);
    if(s.flags.agents&&s.funding>COST.agents(s)*3)ACT.agents(s);
    if(s.flags.btc&&step%20===0&&s.funding>1e8)ACT.buyBtc(s);
    if(s.flags.outside&&s.btc>COST.robots(s)*1.05)ACT.robots(s);
  }
  tick(s,0.5);
  if(!fixtures[s.era])fixtures[s.era]=JSON.parse(JSON.stringify(s));
}
fs.mkdirSync(path.join(root,'evidence'),{recursive:true});
for(const [era,state] of Object.entries(fixtures))fs.writeFileSync(path.join(root,'evidence',`era-${era}-state.json`),JSON.stringify(state));
const result={policy:'legal resource-constrained automated audit policy; no claim of optimality',ended:s.ended,ending:s.ending,simulatedSeconds:s.t,
  completedProjects:Object.values(s.done).filter(x=>x===true).length,
  final:{era:s.era,parameters:D.N(s),capability:D.C(s),insight:s.insight,insightCap:D.insightCap(s),ideas:s.ideas,researchers:s.researchers,notebooks:s.notebooks,funding:s.funding,agents:s.agents,robots:s.robots,fabs:s.fabs,solar:s.solar,web:s.web},
  visible:visibleProjects(s).map(p=>({id:p.id,cost:p.cost})),events};
fs.writeFileSync(path.join(root,'evidence','playthrough.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({...result,events:events.map(x=>({id:x.id,seconds:x.seconds,era:x.era}))},null,2));
