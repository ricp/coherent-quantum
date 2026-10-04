/* Small instrument labels must remain readable in both appearances. */
const fs=require('node:fs');
const css=fs.readFileSync(require('node:path').join(__dirname,'../style.css'),'utf8');
function luminance(hex){
  const c=hex.slice(1).match(/../g).map(v=>parseInt(v,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);
  return .2126*c[0]+.7152*c[1]+.0722*c[2];
}
function contrast(a,b){const x=luminance(a),y=luminance(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
const results=[];
for(const [theme,selector] of [['dark',':root{'],['light',':root[data-theme=light]{']]){
  const body=css.split(selector)[1].split('}')[0],p=Object.fromEntries([...body.matchAll(/--([a-z-]+):(#[0-9a-f]{6})/g)].map(m=>[m[1],m[2]]));
  const pairs=['ink','muted','copper','teal','warning','danger'].flatMap(fg=>['bg','panel','soft','chip'].map(bg=>[fg,bg]));
  pairs.push(['button-ink','button']);
  for(const [fg,bg] of pairs){const ratio=contrast(p[fg],p[bg]);results.push({theme,foreground:fg,background:bg,ratio:Number(ratio.toFixed(2)),pass:ratio>=4.5});}
}
if(process.argv.includes('--write-evidence'))fs.writeFileSync(require('node:path').join(__dirname,'../evidence/coherent/contrast.json'),JSON.stringify(results,null,2)+'\n');
console.log(JSON.stringify({pairs:results.length,minimum:Math.min(...results.map(r=>r.ratio)),failures:results.filter(r=>!r.pass)},null,2));
if(results.some(r=>!r.pass))process.exitCode=1;
