function uZ(n){let{inputs:t,backend:e,attrs:i}=n,{x:r,filter:o}=t,{strides:s,pad:a,dilations:l,dimRoundingMode:c}=i,u=l;u==null&&(u=[1,1]),R.assert(F.eitherStridesOrDilationsAreOne(s,u),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${s} and dilations '${u}'`);let h=F.computeConv2DInfo(r.shape,o.shape,s,u,a,c,!0),p;return ot().getBool("WEBGL_PACK_DEPTHWISECONV")&&h.strideWidth<=2&&h.outChannels/h.inChannels===1?p=new ac(h):p=new sc(h),e.runWebGLProgram(p,[r,o],"float32")}