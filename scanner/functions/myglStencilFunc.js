function myglStencilFunc(sp)
  {
  var func = heap32[sp>>2];sp+=4;
  var ref = heap32[sp>>2];sp+=4;
  var mask = heap32[sp>>2];sp+=4;

  imandreel_gl.stencilFunc(func, ref, mask);
  }