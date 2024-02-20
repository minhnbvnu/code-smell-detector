function myglBlendEquation(sp)
 {
	var mode = heap32[sp>>2];sp+=4;
	imandreel_gl.blendEquation(mode);
 }