window.coherentQAErrors=[];window.addEventListener('error',e=>coherentQAErrors.push({message:e.message,stack:e.error?.stack||''}));
window.coherentIOHistory=[];
const coherentNativeObserver=IntersectionObserver;
window.IntersectionObserver=class extends coherentNativeObserver{constructor(callback,options){super((entries,observer)=>{coherentIOHistory.push(entries.map(e=>({intersects:e.isIntersecting,time:e.time,top:e.boundingClientRect.top,bottom:e.boundingClientRect.bottom})));callback(entries,observer)},options)}};
