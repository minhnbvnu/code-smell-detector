function myglFrontFace (sp)
 {
	var mode = heap32[sp>>2];sp+=4;
	imandreel_gl.frontFace(mode);
 }