function $6(n,t,e){let i=[Uo(n.shape),...Wo(n.shape)],r={dtype:n.dtype,shape:i,dataId:n.dataId},o=[Uo(t),...Wo(t)],s=new ic(o,i),a=!0,l=e.runWebGLProgram(s,[r],n.dtype,null,a);return{dataId:l.dataId,shape:t,dtype:l.dtype}}