function IQ(n){let{inputs:t,backend:e,attrs:i}=n,{sparseIndices:r,sparseValues:o,defaultValue:s}=t,{outputShape:a}=i,{sliceRank:l,numUpdates:c,strides:u,outputSize:h}=F.calculateShapes(o,r,a),p=!1,d=new cc(c,l,r.shape.length,o.shape.length,u,[h,1],p),f=e.runWebGLProgram(d,[o,r,s],o.dtype),m=Et({inputs:{x:f},backend:e,attrs:{shape:a}});return e.disposeIntermediateTensorInfo(f),m}