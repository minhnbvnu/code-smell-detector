function myglReadPixels(sp)
 {
  var x = heap32[sp>>2];sp+=4;
  var y = heap32[sp>>2];sp+=4;
  var width = heap32[sp>>2];sp+=4;
  var height = heap32[sp>>2];sp+=4;
  var format = heap32[sp>>2];sp+=4;
  var type = heap32[sp>>2];sp+=4;
  var pixels = heap32[sp>>2];sp+=4;

	var bufferView = new Uint8Array(heap,pixels,width*height*4);
  imandreel_gl.readPixels(x,y,width,height,format,type,bufferView);
}