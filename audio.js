/* Original apparatus earcons, not recordings or measurements of quantum hardware.
   Voice tuples: waveform, frequency/filter Hz, final Hz, delay s, duration s, level. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.CoherentSound=api;})(globalThis,function(){
  'use strict';
  const profiles={
    'cryostat-stack':[['noise',260,180,0,.70,.28],['sine',110,80,0,.66,.30],['triangle',220,160,.02,.54,.15]],
    'control-rack':[['triangle',330,440,0,.14,.35],['triangle',440,550,.19,.16,.28],['noise',1000,700,0,.06,.13]],
    'decoder-rack':[['triangle',880,660,0,.07,.25],['triangle',660,550,.10,.07,.25],['triangle',550,440,.20,.12,.29]],
    'processor-package':[['sine',261.63,392,0,.50,.33],['sine',523.25,587.33,.04,.44,.17],['triangle',784,1046.5,.09,.35,.09]],
    'memory-patch':[['sine',293.66,293.66,0,.76,.30],['sine',440,440,.04,.68,.22]],
    'factory-bay':[['triangle',180,120,0,.12,.30],['noise',1700,1100,.16,.06,.18],['triangle',360,240,.30,.20,.28]],
    'planning-console':[['triangle',392,392,0,.08,.25],['triangle',493.88,493.88,.14,.08,.25],['triangle',587.33,587.33,.28,.18,.22]],
    'research-desk':[['noise',1500,900,0,.22,.22],['sine',659.25,659.25,.15,.32,.23]],
    'commissioning-crane':[['noise',650,300,0,.09,.24],['triangle',145,95,.09,.61,.35]],
    'commissioning-cell':[['noise',1200,750,0,.06,.24],['triangle',240,120,.07,.17,.34],['noise',800,450,.26,.05,.17]],
    'chip-bay':[['noise',1900,1200,0,.09,.22],['triangle',740,554.37,.12,.17,.24]],
    'support-bay':[['noise',420,240,0,.30,.30],['sine',165,110,.03,.26,.30]],
    'operations-console':[['sine',523.25,392,0,.20,.28],['sine',523.25,392,.29,.23,.25]],
    'service-terminal':[['triangle',440,440,0,.12,.24],['sine',659.25,659.25,.13,.24,.26]],
    click:[['triangle',300,210,0,.08,.24]],
    enable:[['sine',329.63,329.63,0,.24,.24],['sine',493.88,493.88,.13,.30,.22]],
    result:[['triangle',392,392,0,.28,.24],['sine',587.33,587.33,.12,.38,.24],['sine',784,784,.23,.36,.15]],
    chapter:[['sine',261.63,261.63,0,.42,.25],['sine',329.63,329.63,.14,.42,.23],['sine',392,392,.28,.42,.21],['sine',523.25,523.25,.42,.61,.20]]
  };
  function create(context){
    const master=context.createGain();master.gain.value=0;master.connect(context.destination);
    const noise=context.createBuffer(1,context.sampleRate,context.sampleRate),samples=noise.getChannelData(0);let seed=731;
    for(let i=0;i<samples.length;i++){seed^=seed<<13;seed^=seed>>>17;seed^=seed<<5;samples[i]=(seed>>>0)/2147483648-1;}
    let volume=0,active=null,fading=null,lastKind='',lastAt=-Infinity,played=0;
    function dispose(group){if(!group||group.closed)return;group.closed=true;group.nodes.forEach(node=>node.disconnect());if(active===group)active=null;if(fading===group)fading=null;}
    function retire(group,fade=false){
      if(!group||group.closed)return;const now=context.currentTime,end=now+(fade?.012:0);
      group.gain.gain.cancelScheduledValues(now);group.gain.gain.setValueAtTime(fade?1:0,now);if(fade)group.gain.gain.linearRampToValueAtTime(0,end);
      group.sources.forEach(source=>source.stop(end));if(!fade)dispose(group);
    }
    function stop(){retire(fading);retire(active);lastKind='';lastAt=-Infinity;}
    function setVolume(value){
      volume=Number.isFinite(value)?Math.max(0,Math.min(1,value)):0;const now=context.currentTime;
      master.gain.cancelScheduledValues(now);if(!volume){master.gain.setValueAtTime(0,now);stop();}else master.gain.setTargetAtTime(volume*.35,now,.01);
    }
    function play(kind='click'){
      const voices=profiles[kind],now=context.currentTime,priority=kind==='chapter'?3:kind==='result'?2:['click','enable'].includes(kind)?0:1;
      if(!voices||!volume||context.state!=='running'&&typeof context.startRendering!=='function')return false;
      if(kind===lastKind&&now-lastAt<.09)return false;
      if(active&&now<active.end&&active.priority>priority)return false;
      retire(fading);fading=active;retire(fading,true);
      const gain=context.createGain();gain.connect(master);const group={gain,nodes:[gain],sources:[],left:voices.length,priority,end:now+.012,closed:false};active=group;
      for(const [wave,frequency,to,delay,duration,level] of voices){
        const source=wave==='noise'?context.createBufferSource():context.createOscillator(),envelope=context.createGain(),start=now+.012+delay,end=start+duration;
        group.sources.push(source);group.nodes.push(source,envelope);group.end=Math.max(group.end,end+.02);
        if(wave==='noise'){source.buffer=noise;const filter=context.createBiquadFilter();filter.type='bandpass';filter.Q.value=1.2;filter.frequency.setValueAtTime(frequency,start);filter.frequency.exponentialRampToValueAtTime(to,end);source.connect(filter);filter.connect(envelope);group.nodes.push(filter);}
        else{source.type=wave;source.frequency.setValueAtTime(frequency,start);source.frequency.exponentialRampToValueAtTime(to,end);source.connect(envelope);}
        envelope.gain.setValueAtTime(0,start);envelope.gain.linearRampToValueAtTime(level,start+Math.min(.025,duration*.18));envelope.gain.exponentialRampToValueAtTime(.00001,end);envelope.gain.linearRampToValueAtTime(0,end+.01);envelope.connect(gain);
        source.onended=()=>{if(!group.closed&&!--group.left)dispose(group);};source.start(start);source.stop(end+.02);
      }
      lastKind=kind;lastAt=now;played++;return true;
    }
    return {play,stop,setVolume,get diagnostics(){return {played,lastKind,volume,groups:Number(!!active)+Number(!!fading),sources:(active?.sources.length||0)+(fading?.sources.length||0),context:context.state};}};
  }
  return {profiles,create};
});
