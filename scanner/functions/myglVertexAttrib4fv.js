function myglVertexAttrib4fv(sp)
 {
	var index = heap32[sp>>2];sp+=4;
	var ptr = heap32[sp>>2];sp+=4;
	var x = heap32[ptr>>2];ptr+=4;
	var y = heap32[ptr>>2];ptr+=4;
	var z = heap32[ptr>>2];ptr+=4;
	var w = heap32[ptr>>2];ptr+=4;

	imandreel_gl.vertexAttrib4f(index,x,y,z,w);
 }