function myglDepthRangef (sp)
 {
	var zNear = heapFloat[sp>>2];sp+=4;
	var zFar = heapFloat[sp>>2];sp+=4;
	imandreel_gl.depthRange(zNear, zFar);
 }