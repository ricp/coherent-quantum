const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict'),path=require('path');
const root=process.argv[2]||path.resolve(__dirname,'..','..'),kit={};vm.runInNewContext(fs.readFileSync(path.join(root,'assets/three/three-tools.min.js'),'utf8'),kit);const T=kit.CoherentThree.THREE,source=fs.readFileSync(path.join(root,'instrument-3d.js'),'utf8');
const ctx={T,point:(...p)=>new T.Vector3(...p),transient:[],assembly:{add(){}},palette:{copper:new T.MeshBasicMaterial(),silver:new T.MeshBasicMaterial(),trace:new T.MeshBasicMaterial()},movables:{}};
vm.runInNewContext(source.match(/  function cable[^\n]+/)[0],ctx);
for(const name of ['controlPath','readoutPath']){
vm.runInNewContext(source.match(new RegExp('movables\\.'+name+'=cable\\([^\\n]+;'))[0],ctx);const c=ctx.movables[name],geom=ctx.transient.at(-1),positions=geom.getAttribute('position');let min=Infinity,minTube=Infinity;
for(let i=0;i<=10000;i++)min=Math.min(min,c.getPoint(i/10000).y);for(let i=0;i<positions.count;i++)minTube=Math.min(minTube,positions.getY(i));assert(minTube>.20,'The rendered route must clear the pedestrian/floor surface');console.log(JSON.stringify({route:name,curve:c.curveType,tension:c.tension,minCenterY:min,minRenderedTubeY:minTube}));
}
const replay=ctx.cable([[0,2,0],[1,2.4,0],[2,2,0]],'trace',.018);assert.equal(replay.curveType,'centripetal','Rehearsal should retain its existing smooth curve default');console.log('Cable floor-clearance and replay-default intent checks passed');
