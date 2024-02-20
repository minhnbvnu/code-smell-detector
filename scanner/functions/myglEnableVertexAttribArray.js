function myglEnableVertexAttribArray(sp)
{
	var idx = heapU32[sp>>2];sp+=4;
	imandreel_gl.enableVertexAttribArray(idx);
}