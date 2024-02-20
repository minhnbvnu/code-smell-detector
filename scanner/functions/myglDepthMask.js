function myglDepthMask (sp)
 {
	var flag = heap32[sp>>2];sp+=4;
	imandreel_gl.depthMask(flag);
 }