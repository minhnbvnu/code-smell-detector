function mandreel_Audio_requestSoundData(soundData)
{
	var n = soundData.length/2;
	var offset2 = 0;
	while ( n > 0 )
	{
		var n2 = n;
		if ( n2 > 1024 )
			n2 = 1024;
		var sp = g_stack_pointer+100*1024;
		var ptr = g_stack_pointer+200*1024;
		var _sp = sp>>2;
		heap32[_sp]=ptr;
		heap32[_sp+1]=n2;
		__FUNCTION_TABLE__[(mandreel_audio_stream_func_ptr)>>2](sp);

		var offset = ptr>>2;
		var size = n2*2;
		var buf = heapFloat.subarray(offset,offset+size);
		soundData.set(buf,offset2);
		/*for (var i=0; i<size; i++)
		  soundData[i+offset2] = heapFloat[offset+i];*/
		offset2 += n2*2;
		n -= n2;
	}
 }