function myglColorMask (sp)
 {
	var red = heap32[sp>>2];sp+=4;
	var green = heap32[sp>>2];sp+=4;
	var blue = heap32[sp>>2];sp+=4;
	var alpha = heap32[sp>>2];sp+=4;
	imandreel_gl.colorMask(red,green,blue,alpha);
 }