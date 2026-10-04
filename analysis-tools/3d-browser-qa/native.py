from pathlib import Path
exec(Path(__file__).with_name('common.py').read_text())
import base64
call('--init-script',str(Path(__file__).with_name('capture-errors.js')),'open',root.joinpath('index-3d.html').as_uri());call('set','viewport','1440','1050','1');load(out/'legal-staff-before.json');focus('research');scroll()
call('screenshot',str(out/'staff-before.png'))
evaluate("(()=>{const stream=document.getElementById('three-canvas').captureStream(30);window.coherentMovieParts=[];window.coherentMovie=new MediaRecorder(stream,{mimeType:'video/webm;codecs=vp9'});coherentMovie.ondataavailable=e=>{if(e.data.size)coherentMovieParts.push(e.data)};coherentMovie.start();return true})()")
rows=[{'action':'staff before',**info()}]
call('click','[data-assign=staff][data-delta="1"]');wait(100);call('screenshot',str(out/'staff-purchase-cue.png'));call('click','#three-inspect-expansion');wait(750);scroll();call('screenshot',str(out/'staff-after.png'));rows.append({'action':'legal hire 3 to 4',**info()});print('Native hire verified',flush=True)
load(out/'legal-native-before.json');focus('overview');call('click','#three-pause');wait(300);rows.append({'action':'resume chapter 4',**info()})
for name in ['hardware','rack','pulse','decoder','automation']:
 enabled=evaluate("!document.querySelector('[data-upgrade="+name+"]').disabled");assert enabled,name
 call('click','[data-upgrade='+name+']');wait(100);call('screenshot',str(out/('cue-'+name+'.png')));call('click','#three-inspect-expansion');wait(850);scroll();call('screenshot',str(out/('purchase-'+name+'.png')));rows.append({'action':name,**info()});print('Native purchase '+name+' verified',flush=True)
call('click','#lab-view [data-engineering=workshop]');call('click','[data-upgrade=workshop]');wait(100);call('click','#three-inspect-expansion');wait(900);scroll();rows.append({'action':'workshop engineering and equipment',**info()});call('screenshot',str(out/'purchase-workshop.png'))
focus('fabrication');wait(1300);rows.append({'action':'active funded construction',**info()});call('screenshot',str(out/'construction-active.png'));call('click','#three-pause')
load(old/'frontier-ready.json');focus('overview');call('click','#three-follow');call('click','#three-pause');call('click','[data-run-workload=dynamics]');wait(1100);focus('planning');scroll();wait(700);assert evaluate('Coherent3D.diagnostics.inViewport && Coherent3D.diagnostics.camera==="planning" && Coherent3D.diagnostics.driverActive');rows.append({'action':'native full schedule',**info()});call('screenshot',str(out/'schedule-active.png'));wait(1000);call('click','#three-pause')
movie=evaluate("new Promise(resolve=>{coherentMovie.onstop=()=>{const blob=new Blob(coherentMovieParts,{type:coherentMovie.mimeType}),reader=new FileReader;reader.onload=()=>{coherentMovie.stream.getTracks().forEach(t=>t.stop());resolve({data:reader.result.split(',')[1],size:blob.size,mime:blob.type})};reader.readAsDataURL(blob)};coherentMovie.stop()})")
(out/'legal-purchases-motion.webm').write_bytes(base64.b64decode(movie.pop('data')))
(out/'native-purchases.json').write_text(json.dumps({'actions':rows,'movie':movie},indent=2)+'\n');print(json.dumps(movie),flush=True)
# Correct focus captures: camera buttons, never the similarly named main navigation.
load(out/'legal-growth-commissioned.json');views=[]
for name in ['cryostat','research','control','processor','memory','planning','fabrication']:
 focus(name);scroll();call('screenshot',str(out/('focus-'+name+'.png')));views.append({'name':name,**info()})
(out/'focus-matrix.json').write_text(json.dumps(views,indent=2)+'\n');print('Seven actual focus captures regenerated',flush=True)
