function myglStencilFuncSeparate(sp)
  {
  var face = heap32[sp>>2];sp+=4;
  var func = heap32[sp>>2];sp+=4;
  var ref = heap32[sp>>2];sp+=4;
  var mask = heap32[sp>>2];sp+=4;

  imandreel_gl.stencilFuncSeparate(face,func,ref,mask);
  }