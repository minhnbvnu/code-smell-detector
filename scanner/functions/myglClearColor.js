function myglClearColor(sp)
{
  var r = heapFloat[sp>>2];sp+=4;
  var g = heapFloat[sp>>2];sp+=4;
  var b = heapFloat[sp>>2];sp+=4;
  var a = heapFloat[sp>>2];sp+=4;

  imandreel_gl.clearColor(r,g,b,a);


}