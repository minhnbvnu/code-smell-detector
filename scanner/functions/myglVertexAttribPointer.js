function myglVertexAttribPointer(sp)
{
	var idx = heapU32[sp>>2];sp+=4;
	var size = heapU32[sp>>2];sp+=4;
	var type = heapU32[sp>>2];sp+=4;
	var normalized = heapU32[sp>>2];sp+=4;
	var stride = heapU32[sp>>2];sp+=4;
	var ptr = heapU32[sp>>2];sp+=4;

	//dump(idx + ' ' + size + ' ' + type + ' ' + normalized + ' ' + stride + ' ' + ptr + '\n');


	imandreel_gl.vertexAttribPointer(idx, size, type, normalized, stride, ptr);
}