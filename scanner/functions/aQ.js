function aQ(n){let{inputs:t,backend:e,attrs:i}=n,{images:r}=t,{alignCorners:o,halfPixelCenters:s,size:a}=i,[l,c]=a,u=new Q0(r.shape,l,c,o,s);return e.runWebGLProgram(u,[r],r.dtype)}