function Mandreel_Audio_CreateStream(sp)
{
	if ( !__Mandreel_Audio_CreateStream_created )
	{
		if (webAudioContext)
		{
			mandreel_audio_stream_func_ptr = heap32[sp>>2];
			var source =  webAudioContext.createJavaScriptNode(1024*4, 0, 2);
			source.connect(webAudioContext.destination);
			source.onaudioprocess = mandreel_audio_stream_process;
		}
		else
		{
			mandreel_audio_stream_func_ptr = heap32[sp>>2];
			AudioDataDestination(44100,mandreel_Audio_requestSoundData);
		}
		__Mandreel_Audio_CreateStream_created = true;
	}
}