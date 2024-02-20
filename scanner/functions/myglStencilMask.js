function myglStencilMask(sp)
  {
   var mask = heap32[sp>>2];sp+=4;

   imandreel_gl.stencilMask(mask);
  }