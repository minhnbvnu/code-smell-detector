function mandreel_audio_stream_process(e)
{
	var l = e.outputBuffer.getChannelData(0);
	var l2 = e.outputBuffer.getChannelData(1);
	var n = e.outputBuffer.length;

	var offset2 = 0;
	var inc = 44.1 / 48.0;
	while ( n > 0 )
	{
		var n2 = ((n*inc)|0)/4;
		if ( n2 > 1024 )
			n2 = 1024;

		var sp = g_stack_pointer+100*1024;
		var ptr = g_stack_pointer+200*1024;
		var _sp = sp>>2;
		heap32[_sp]=ptr;
		heap32[_sp+1]=n2*4;
		__FUNCTION_TABLE__[(mandreel_audio_stream_func_ptr)>>2](sp);

		var offset = ptr>>2;
		var size = n2*4;
		/*for (var i=0;i<size;++i)
		{
			l[i+offset2] = heapFloat[offset+(i*2)];
			l2[i+offset2] = heapFloat[offset+(i*2)+1];
		}*/
		var i = 0;
		var j = 0;
		while ( i < size )
		{
			l[j+offset2] = heapFloat[offset+((i|0)*2)];
			l2[j+offset2] = heapFloat[offset+((i|0)*2)+1];
			i += inc;
			j++;
		}

		//offset2 += n2*4;
		//n -= n2*4;
		offset2 += j;
		n -= j;
	}
}