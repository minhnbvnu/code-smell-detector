function myglVertexAttrib2fv(sp)
 {
	var index = heap32[sp>>2];sp+=4;
	var ptr = heap32[sp>>2];sp+=4;
	var x = heap32[ptr>>2];ptr+=4;
	var y = heap32[ptr>>2];ptr+=4;

	imandreel_gl.vertexAttrib2f(index,x,y);
 }