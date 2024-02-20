function myglBlendFunc (sp)
 {
	var sfactor = heap32[sp>>2];sp+=4;
	var dfactor = heap32[sp>>2];sp+=4;
	imandreel_gl.blendFunc(sfactor,dfactor);
 }