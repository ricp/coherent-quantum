import subprocess,json,pathlib,time
root=pathlib.Path(__file__).resolve().parents[2];out=root/'evidence/immersive-lab';old=root/'evidence/coherent-3d';cmd=['agent-browser','--session','coherent-immersive']
def call(*args,input=None):
 p=subprocess.run(cmd+list(args),input=input,text=True,capture_output=True,check=True);return p.stdout.strip()
def evaluate(js):return json.loads(call('eval','--stdin',input=js))
def wait(ms=220):return evaluate('new Promise(resolve=>setTimeout(()=>resolve(true),'+str(ms)+'))')
def load(file):
 call('click','[data-dialog=settings-dialog]');call('upload','#import-file',str(file));call('click','[data-close=settings-dialog]');wait()
def focus(name):call('click','[data-camera='+name+']');wait()
def info():return evaluate("(()=>({diagnostics:Coherent3D.diagnostics,overflow:document.documentElement.scrollWidth>innerWidth,focus:document.getElementById('three-focus-title').textContent,growth:document.getElementById('three-growth-readout').textContent,legend:document.getElementById('three-key').textContent,description:document.getElementById('three-description').textContent,errors:window.coherentQAErrors||[]}))()")
def scroll():
 evaluate("(()=>{document.getElementById('three-lab').scrollIntoView({block:'start'});scrollBy(0,-85);return true})()");wait(120)
def sample(ms=500):return evaluate('new Promise(resolve=>{const start=Coherent3D.diagnostics;setTimeout(()=>resolve({before:start,after:Coherent3D.diagnostics,delta:Coherent3D.diagnostics.frames-start.frames,ms:'+str(ms)+'}),'+str(ms)+')})')
