function mPe(){return new Promise(e=>{process.nextTick(()=>{let t=eu.loadavg().map(function(n){return n/pt.cores()}),r=parseFloat(Math.max.apply(Math,t).toFixed(2)),i={};if(Date.now()-qr.ms>=200){qr.ms=Date.now();let n=eu.cpus(),s=0,o=0,u=0,l=0,p=0,c=[];tC=n.length;for(let h=0;h<tC;h++){let g=n[h].times;s+=g.user,o+=g.sys,u+=g.nice,p+=g.idle,l+=g.irq;let y=Ve&&Ve[h]&&Ve[h].totalTick?Ve[h].totalTick:0,S=Ve&&Ve[h]&&Ve[h].totalLoad?Ve[h].totalLoad:0,x=Ve&&Ve[h]&&Ve[h].user?Ve[h].user:0,w=Ve&&Ve[h]&&Ve[h].sys?Ve[h].sys:0,b=Ve&&Ve[h]&&Ve[h].nice?Ve[h].nice:0,C=Ve&&Ve[h]&&Ve[h].idle?Ve[h].idle:0,O=Ve&&Ve[h]&&Ve[h].irq?Ve[h].irq:0;Ve[h]=g,Ve[h].totalTick=Ve[h].user+Ve[h].sys+Ve[h].nice+Ve[h].irq+Ve[h].idle,Ve[h].totalLoad=Ve[h].user+Ve[h].sys+Ve[h].nice+Ve[h].irq,Ve[h].currentTick=Ve[h].totalTick-y,Ve[h].load=Ve[h].totalLoad-S,Ve[h].load_user=Ve[h].user-x,Ve[h].load_system=Ve[h].sys-w,Ve[h].load_nice=Ve[h].nice-b,Ve[h].load_idle=Ve[h].idle-C,Ve[h].load_irq=Ve[h].irq-O,c[h]={},c[h].load=Ve[h].load/Ve[h].currentTick*100,c[h].load_user=Ve[h].load_user/Ve[h].currentTick*100,c[h].load_system=Ve[h].load_system/Ve[h].currentTick*100,c[h].load_nice=Ve[h].load_nice/Ve[h].currentTick*100,c[h].load_idle=Ve[h].load_idle/Ve[h].currentTick*100,c[h].load_irq=Ve[h].load_irq/Ve[h].currentTick*100,c[h].raw_load=Ve[h].load,c[h].raw_load_user=Ve[h].load_user,c[h].raw_load_system=Ve[h].load_system,c[h].raw_load_nice=Ve[h].load_nice,c[h].raw_load_idle=Ve[h].load_idle,c[h].raw_load_irq=Ve[h].load_irq}let d=s+o+u+l+p,f=s+o+u+l,m=d-qr.tick;i={avgload:r,currentload:(f-qr.load)/m*100,currentload_user:(s-qr.user)/m*100,currentload_system:(o-qr.system)/m*100,currentload_nice:(u-qr.nice)/m*100,currentload_idle:(p-qr.idle)/m*100,currentload_irq:(l-qr.irq)/m*100,raw_currentload:f-qr.load,raw_currentload_user:s-qr.user,raw_currentload_system:o-qr.system,raw_currentload_nice:u-qr.nice,raw_currentload_idle:p-qr.idle,raw_currentload_irq:l-qr.irq,cpus:c},qr={user:s,nice:u,system:o,idle:p,irq:l,tick:d,load:f,ms:qr.ms,currentload:i.currentload,currentload_user:i.currentload_user,currentload_system:i.currentload_system,currentload_nice:i.currentload_nice,currentload_idle:i.currentload_idle,currentload_irq:i.currentload_irq,raw_currentload:i.raw_currentload,raw_currentload_user:i.raw_currentload_user,raw_currentload_system:i.raw_currentload_system,raw_currentload_nice:i.raw_currentload_nice,raw_currentload_idle:i.raw_currentload_idle,raw_currentload_irq:i.raw_currentload_irq}}else{let n=[];for(let s=0;s<tC;s++)n[s]={},n[s].load=Ve[s].load/Ve[s].currentTick*100,n[s].load_user=Ve[s].load_user/Ve[s].currentTick*100,n[s].load_system=Ve[s].load_system/Ve[s].currentTick*100,n[s].load_nice=Ve[s].load_nice/Ve[s].currentTick*100,n[s].load_idle=Ve[s].load_idle/Ve[s].currentTick*100,n[s].load_irq=Ve[s].load_irq/Ve[s].currentTick*100,n[s].raw_load=Ve[s].load,n[s].raw_load_user=Ve[s].load_user,n[s].raw_load_system=Ve[s].load_system,n[s].raw_load_nice=Ve[s].load_nice,n[s].raw_load_idle=Ve[s].load_idle,n[s].raw_load_irq=Ve[s].load_irq;i={avgload:r,currentload:qr.currentload,currentload_user:qr.currentload_user,currentload_system:qr.currentload_system,currentload_nice:qr.currentload_nice,currentload_idle:qr.currentload_idle,currentload_irq:qr.currentload_irq,raw_currentload:qr.raw_currentload,raw_currentload_user:qr.raw_currentload_user,raw_currentload_system:qr.raw_currentload_system,raw_currentload_nice:qr.raw_currentload_nice,raw_currentload_idle:qr.raw_currentload_idle,raw_currentload_irq:qr.raw_currentload_irq,cpus:n}}e(i)})})}