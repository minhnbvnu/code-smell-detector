function XY(n){let{inputs:t,backend:e,attrs:i}=n,{x:r}=t,{clipValueMin:o,clipValueMax:s}=i,a;ot().getBool("WEBGL_PACK_CLIP")?a=new p0(r.shape):a=new h0(r.shape);let l=a.getCustomSetupFunc(o,s);return e.runWebGLProgram(a,[r],r.dtype,l)}