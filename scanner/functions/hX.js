function hX(n){let{inputs:t,backend:e,attrs:i}=n,{images:r,dy:o}=t,{alignCorners:s}=i;ut([o,r],"resizeBilinearGrad");let a=R.computeStrides(r.shape),[l,c,u,h]=r.shape,[,p,d]=o.shape,f=new Float32Array(l*c*u*h),m=[s&&p>1?c-1:c,s&&d>1?u-1:u],x=[s&&p>1?p-1:p,s&&d>1?d-1:d],g=m[0]/x[0],v=m[1]/x[1],b=e.data.get(o.dataId).values,y=0;for(let _=0;_<l;_++){let S=_*a[0];for(let E=0;E<p;E++){let M=E*g,P=Math.floor(M),D=Math.min(Math.ceil(M),c-1),w=S+P*a[1],I=S+D*a[1],N=M-P,L=1-N;for(let O=0;O<d;O++){let z=O*v,V=Math.floor(z),$=Math.min(Math.ceil(z),u-1),X=z-V,W=1-X,K=w+V*a[2],Z=w+$*a[2],Y=I+V*a[2],tt=I+$*a[2],q=L*W,et=L*X,it=N*W,at=N*X;for(let nt=0;nt<h;nt++){let _t=b[y++];f[K+nt]+=_t*q,f[Z+nt]+=_t*et,f[Y+nt]+=_t*it,f[tt+nt]+=_t*at}}}}return e.makeTensorInfo([l,u,c,h],"float32",f)}