function wW(n,t,e,i,r,o,s,a,l){let c=t.slice(),u=e.slice(),h=i;i==null&&(h=new Array(c.length));let p=c1(s);if(p.length>1)throw new Error("Multiple ellipses in slice is not allowed.");if(s!==0&&a!==0)throw new Error("Using both ellipsisMask and newAxisMask is not yet supported.");if(s!==0&&l!==0)throw new Error("Using both ellipsisMask and shrinkAxisMask is not yet supported.");let d=n.length-c.length,f=c1(a),m=n.slice();f.forEach(E=>{c[E]=0,u[E]=1,m.splice(E,0,1)});let{begin:x,end:g,strides:v}=fA(m,p,d,c,u,h,r,o,s);c=x,u=g,h=v;let b=c1(l);b.forEach(E=>{u[E]=c[E]+1,h[E]=1});let y=uA(c,u,h),_=y.filter((E,M)=>b.indexOf(M)===-1);return{nonStrided:h.every(E=>E===1),$begin:c,$end:u,$strides:h,size:y,newShape:m,outShape:_}}