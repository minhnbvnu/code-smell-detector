function myglBufferData(sp)
{
	var target = heapU32[sp>>2]; sp+=4;
	var size = heapU32[sp>>2]; sp+=4;
	var data = heapU32[sp>>2]; sp+=4;
	var usage = heapU32[sp>>2]; sp+=4;

	if (data == 0)
		imandreel_gl.bufferData(target, size, usage);
	else
	{
		if (usage == imandreel_gl.STATIC_DRAW || true)
		{
			var buffer_data = new Int8Array(heap, data, size);
			imandreel_gl.bufferData(target, buffer_data, usage);
		}
		else
		{
			var new_size = size/4;
			var buffer_data = glBufferDataArray[new_size];

			if (buffer_data == null)
			{
				buffer_data =  new Int32Array(new_size);
				glBufferDataArray[new_size] = buffer_data;
			}

			var new_data = data>>2;

			for ( var i = 0 ; i < new_size ; ++i )
			{
				buffer_data[i] = heap32[new_data+i];
			}

			imandreel_gl.bufferData(target, buffer_data, usage);
		}
	}
}