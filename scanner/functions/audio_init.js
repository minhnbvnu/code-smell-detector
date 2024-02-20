function audio_init()
{
    if(is_chrome) audio_context.resume()
	if(starting_mute) toggleMute();

	if(audio_client_resampling_factor==0) return; //if failed to find a valid resampling factor...

	audio_debug_time_start=(new Date()).getTime();
	audio_debug_time_last_start=audio_debug_time_start;

	//https://github.com/0xfe/experiments/blob/master/www/tone/js/sinewave.js
	audio_initialized=1; // only tell on_ws_recv() not to call it again


	//on Chrome v36, createJavaScriptNode has been replaced by createScriptProcessor
	createjsnode_function = (audio_context.createJavaScriptNode == undefined)?audio_context.createScriptProcessor.bind(audio_context):audio_context.createJavaScriptNode.bind(audio_context);
	audio_node = createjsnode_function(audio_buffer_size, 0, 1);
	audio_node.onaudioprocess = audio_onprocess;
	audio_node.connect(audio_context.destination);
	// --- Resampling ---
	//https://github.com/grantgalitz/XAudioJS/blob/master/XAudioServer.js
	//audio_resampler = new Resampler(audio_received_sample_rate, audio_context.sampleRate, 1, audio_buffer_size, true);
	//audio_input_buffer_size = audio_buffer_size*(audio_received_sample_rate/audio_context.sampleRate);
	webrx_set_param("audio_rate",audio_context.sampleRate); //Don't try to resample //TODO remove this

	window.setInterval(audio_flush,audio_flush_interval_ms);
	divlog('Web Audio API succesfully initialized, sample rate: '+audio_context.sampleRate.toString()+ " sps");
	/*audio_source=audio_context.createBufferSource();
   audio_buffer = audio_context.createBuffer(xhr.response, false);
	audio_source.buffer = buffer;
	audio_source.noteOn(0);*/
	demodulator_analog_replace(starting_mod);
	if(starting_offset_frequency)
	{
		demodulators[0].offset_frequency = starting_offset_frequency;
		e("webrx-actual-freq").innerHTML=format_frequency("{x} MHz",center_freq+starting_offset_frequency,1e6,4);
		demodulators[0].set();
		mkscale();
	}

	//hide log panel in a second (if user has not hidden it yet)
	window.setTimeout(function(){
		if(typeof e("openwebrx-panel-log").openwebrxHidden == "undefined" && !was_error)
		{
			toggle_panel("openwebrx-panel-log");
			//animate(e("openwebrx-panel-log"),"opacity","",1,0,0.9,1000,60);
			//window.setTimeout(function(){toggle_panel("openwebrx-panel-log");e("openwebrx-panel-log").style.opacity="1";},1200)
		}
	},2000);

}