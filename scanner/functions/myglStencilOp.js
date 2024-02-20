function myglStencilOp (sp)
  {
   var fail = heap32[sp>>2];sp+=4;
  var zfail = heap32[sp>>2];sp+=4;
   var zpass = heap32[sp>>2];sp+=4;

  imandreel_gl.stencilOp(fail, zfail, zpass);
  }