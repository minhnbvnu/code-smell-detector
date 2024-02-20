function myglStencilMaskSeparate(sp)
  {
  var face = heap32[sp>>2];sp+=4;
   var mask = heap32[sp>>2];sp+=4;

   imandreel_gl.stencilMaskSeparate(face,mask);
  }