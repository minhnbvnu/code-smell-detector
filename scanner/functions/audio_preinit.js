function audio_preinit()
{
	try
	{
		window.AudioContext = window.AudioContext||window.webkitAudioContext;
		audio_context = new AudioContext();
	}
	catch(e)
	{
		divlog('Your browser does not support Web Audio API, which is required for WebRX to run. Please upgrade to a HTML5 compatible browser.', 1);
		return;
	}

	if(audio_context.sampleRate<44100*2)
		audio_buffer_size = 4096;
	else if(audio_context.sampleRate>=44100*2 && audio_context.sampleRate<44100*4)
		audio_buffer_size = 4096 * 2;
	else if(audio_context.sampleRate>44100*4)
		audio_buffer_size = 4096 * 4;

	audio_rebuffer = new sdrjs.Rebuffer(audio_buffer_size,sdrjs.REBUFFER_FIXED);
	audio_last_output_buffer = new Float32Array(audio_buffer_size);

	//we send our setup packet
	parsehash();

	audio_calculate_resampling(audio_context.sampleRate);
	audio_resampler = new sdrjs.RationalResamplerFF(audio_client_resampling_factor,1);
	ws.send("SET output_rate="+audio_server_output_rate.toString()+" action=start"); //now we'll get AUD packets as well

}