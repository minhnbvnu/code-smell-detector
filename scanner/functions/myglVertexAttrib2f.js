function myglVertexAttrib2f(sp)
 {
	var index = heap32[sp>>2];sp+=4;
	var x = heapFloat[sp>>2];sp+=4;
	var y = heapFloat[sp>>2];sp+=4;
	imandreel_gl.vertexAttrib2f(index,x,y);
 }