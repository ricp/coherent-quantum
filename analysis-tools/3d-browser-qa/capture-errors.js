window.coherentQAErrors=[];
window.addEventListener('error',e=>coherentQAErrors.push({message:e.message,stack:e.error?.stack||'',file:e.filename,line:e.lineno,column:e.colno}));
