function FP(n,t,e){let i=n,r=new Float32Array(e);return i.bindBuffer(i.PIXEL_PACK_BUFFER,t),i.getBufferSubData(i.PIXEL_PACK_BUFFER,0,r),i.bindBuffer(i.PIXEL_PACK_BUFFER,null),r}