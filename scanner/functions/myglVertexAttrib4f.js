function myglVertexAttrib4f(sp)
 {
	var index = heap32[sp>>2];sp+=4;
	var x = heapFloat[sp>>2];sp+=4;
	var y = heapFloat[sp>>2];sp+=4;
	var z = heapFloat[sp>>2];sp+=4;
	var w = heapFloat[sp>>2];sp+=4;
	imandreel_gl.vertexAttrib4f(index,x,y,z,w);
 }