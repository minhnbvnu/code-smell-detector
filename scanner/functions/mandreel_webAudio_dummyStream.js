function mandreel_webAudio_dummyStream()
{
	var sp = g_stack_pointer+100*1024;
	var ptr = g_stack_pointer+200*1024;
	var _sp = sp>>2;
	heap32[_sp]=ptr;
	heap32[_sp+1]=4096;
	__FUNCTION_TABLE__[(mandreel_audio_stream_func_ptr)>>2](sp);
	setTimeout("mandreel_webAudio_dummyStream()",10);
}