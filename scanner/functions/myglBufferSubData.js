function myglBufferSubData(sp)
{
	var target = heapU32[sp>>2]; sp+=4;
	var offset = heapU32[sp>>2]; sp+=4;
	var size = heapU32[sp>>2]; sp+=4;
	var data = heapU32[sp>>2]; sp+=4;


	var buffer_data = new Int8Array(heap, data, size);
	imandreel_gl.bufferSubData(target, offset, buffer_data);

//	dump('buffer sub data ' + offset + ' ' + size + ' ' + data + '\n')

}