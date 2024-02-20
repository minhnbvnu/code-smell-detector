function myglBlendColor(sp)
 {
	var red = heapFloat[sp>>2];sp+=4;
	var green = heapFloat[sp>>2];sp+=4;
	var blue = heapFloat[sp>>2];sp+=4;
	var alpha = heapFloat[sp>>2];sp+=4;
	imandreel_gl.blendColor(red,green,blue,alpha);
 }