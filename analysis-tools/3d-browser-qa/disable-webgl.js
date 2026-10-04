const coherentNativeContext=HTMLCanvasElement.prototype.getContext;
HTMLCanvasElement.prototype.getContext=function(kind,...args){if(kind==='webgl2')throw new Error('QA: WebGL2 disabled');return coherentNativeContext.call(this,kind,...args);};
