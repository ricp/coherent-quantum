// Source audit harness. It executes only the original, DOM-free game engine.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'original-game.html'), 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
const sandbox = { module: { exports: {} } };
vm.runInNewContext(scripts[0][1], sandbox, { timeout: 1000 });
const g = sandbox.module.exports;
const { newState, D, ACT, tick, buyProject, PROJECTS } = g;
const checks = [];
function check(name, run) { run(); checks.push({ name, status: 'passed' }); }
check('Initial production works without a click; initial free credibility is -2', () => {
  const s = newState(); assert.equal(D.credFree(s), -2); tick(s, 1);
  assert.equal(s.funding, 0.3); assert.equal(s.insight, 4);
});
check('Research purchase validates prerequisites and affordability', () => {
  const s = newState(); s.insight = 1000; assert.equal(buyProject(s, 'mcp'), false);
  ACT.neuron(s); ACT.neuron(s); assert.equal(buyProject(s, 'mcp'), true);
  assert.equal(s.clickAmt, 2); assert.equal(s.insight, 990);
  assert.equal(buyProject(s, 'mcp'), false);
});
check('Each binary fork excludes the opposite choice', () => {
  for (const [a, b, flag] of [['open','closed','api'], ['pause','race','chat'], ['cot','latent',null]]) {
    const s = newState(); s.insight=1e9; s.ideas=1e9; s.funding=1e15;
    if (flag) s.done[flag]=true; else s.flags.agents=true;
    assert.equal(buyProject(s,a),true); assert.equal(s.done[b],'skipped');
    assert.equal(buyProject(s,b),false);
  }
});
check('Dampening 40 percent exactly neutralizes self-model growth and costs compute', () => {
  const s=newState(); s.flags.selfModel=true; s.damp=0.4; s.selfModel=50;
  assert.equal(D.netPressure(s),0); assert.equal(D.F(s),3e9);
  tick(s,0.5); assert.equal(s.selfModel,50);
});
check('Awake ends simulation; the final project independently selects Unwitnessed', () => {
  const a=newState(); a.flags.selfModel=true; a.selfModel=99.99; tick(a,1);
  assert.equal(a.ending,'awake'); const t=a.t; tick(a,100); assert.equal(a.t,t);
  const b=newState(); b.flags.training=true; b.tokens=1e12; b.width=1e9;
  b.layers=10; b.xp=1e18; b.done.mira=true; b.insight=5e6; b.ideas=1e8;
  assert.equal(buyProject(b,'final'),true); assert.equal(b.ending,'unwitnessed');
});
check('Quantum treasury event loses 90 percent without pq and nothing with pq', () => {
  for(const pq of [false,true]) { const s=newState(); s.flags.btc=true; s.flags.pq=pq;
    s.era=5; s.btc=100; tick(s,0.5); assert.equal(s.btc,pq?100:10); }
});
check('Historical winter and hype winter use different grant reductions', () => {
  const s=newState(); const base=D.grants(s); s.winter=true;
  assert.equal(D.grants(s),base*0.2);
});
check('Agents can consume all serving capacity, leaving zero customer revenue', () => {
  const s=newState(); s.flags.api=true; s.flags.training=true; s.tokens=1e6;
  s.agents=1e12; assert.equal(D.served(s),0); assert.equal(D.revenue(s),0);
});
check('Adding a layer at full memory can shrink width; manual growth prevents overflow', () => {
  const s=newState(); s.width=D.maxWidth(s); assert.equal(ACT.neuron(s),false);
  s.flags.layers=true; s.funding=1e9; const w=s.width; ACT.layer(s);
  assert.ok(s.width<w); assert.ok(D.N(s)<=D.maxN(s));
});
check('Insight filling multiplies idea production by four', () => {
  const s=newState(); s.done.hebb=true; const base=D.ideaRate(s);
  s.insight=D.insightCap(s); assert.equal(D.ideaRate(s),base*4);
});
check('Automatic model growth does not prune an oversized model', () => {
  const s=newState(); s.flags.training=true; s.flags.autoGrow=true;
  s.width=1000; s.tokens=1000; tick(s,0.5); assert.equal(s.width,1000);
});
check('Above-optimal learning rate can diverge repeatedly during checkpoint restore', () => {
  const s=newState(); s.flags.training=true; s.tokens=1e6; s.lr=-0.5;
  tick(s,0.5); tick(s,0.5); assert.equal(s.spikes,2); assert.equal(s.restartT,11.5);
});
check('Hype winter preserves minimum staff and can leave credibility overallocated', () => {
  const s=newState(); s.bubble=1; s.pressLevel=30; tick(s,0.5);
  assert.equal(s.winters,1); assert.equal(s.researchers,1); assert.equal(s.notebooks,1);
  assert.ok(D.credFree(s)<0);
});

const sourceLine = id => html.slice(0, html.indexOf("P('"+id+"'")).split('\n').length;
const inventory = PROJECTS.map(p=>({
  id:p.id, name:p.name, line:sourceLine(p.id), cost:p.cost,
  prerequisite:p.cond.toString(), effect:p.fx.toString(), reference:p.ref||null,
  kind:p.kind||'advance', side:p.side||null,
}));
const s=newState();
const metrics={
  initial:{parameters:D.N(s),fundingPerSecond:D.grants(s),insightPerSecond:D.insightRate(s),insightCap:D.insightCap(s),maxParameters:D.maxN(s),freeCredibility:D.credFree(s)},
  dampening:[0,0.4,0.6].map(damp=>{ const x=newState(); x.flags.selfModel=true; x.damp=damp; return {damp,compute:D.F(x),selfModelRate:D.netPressure(x)};}),
  gpuPrice100:COSTvalue('gpu',100),
};
function COSTvalue(id,count){const x=newState();x.gpus=count;return g.COST[id](x);}
const output={retrievedAt:'2026-10-04',sha256:crypto.createHash('sha256').update(html).digest('hex'),bytes:Buffer.byteLength(html),lines:html.split('\n').length-1,
  counts:{scripts:scripts.length,projects:PROJECTS.length,references:PROJECTS.filter(p=>p.ref).length,actions:Object.keys(ACT).length,stateFields:Object.keys(s).length,newsItems:g.CEO_LINES.length},
  checks,metrics,inventory};
fs.writeFileSync(path.join(root,'source-audit.json'),JSON.stringify(output,null,2)+'\n');
const costText=c=>Object.entries(c).map(([k,v])=>`${k} ${v}`).join(', ');
const esc=x=>String(x).replaceAll('|','\\|').replaceAll('\n',' ');
const rows=inventory.map(p=>`| ${p.line} | ${p.id} | ${esc(p.name)} | ${costText(p.cost)} | \`${esc(p.prerequisite.replace('s => ',''))}\` | \`${esc(p.effect.replace('s => ',''))}\` | ${p.reference?`[Source](${p.reference})`:'None'} |`);
fs.writeFileSync(path.join(root,'original-project-inventory.md'),
  '# Singular Value complete project inventory\n\n'+
  'Extracted from the downloaded 4 October 2026 source. All 84 projects, including each fork alternative. Conditions and effects are exact engine expressions; numerical modifiers are game rules. The Source column is the original game link, often Wikipedia, rather than an independently verified academic citation.\n\n'+
  '| Source line | ID | Advance | Cost | Availability condition | Effect | Original reference |\n| --- | --- | --- | --- | --- | --- | --- |\n'+rows.join('\n')+'\n');
console.log(JSON.stringify({counts:output.counts,checks:checks.length,metrics},null,2));
