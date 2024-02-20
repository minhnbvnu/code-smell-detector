function audio_buffer_progressbar_update()
{
	if(audio_buffer_progressbar_update_disabled) return;
	var audio_buffer_value=(audio_prepared_buffers.length*audio_buffer_size)/audio_context.sampleRate;
	audio_buffer_total_average_level_length++; audio_buffer_total_average_level=(audio_buffer_total_average_level*((audio_buffer_total_average_level_length-1)/audio_buffer_total_average_level_length))+(audio_buffer_value/audio_buffer_total_average_level_length);
	var overrun=audio_buffer_value>audio_buffer_maximal_length_sec;
	var underrun=audio_prepared_buffers.length==0;
	var text="buffer";
	if(overrun) { text="overrun"; console.log("audio overrun, "+(++audio_overrun_cnt).toString()); }
	if(underrun) { text="underrun"; console.log("audio underrun, "+(++audio_underrun_cnt).toString()); }
	if(overrun||underrun)
	{
		audio_buffer_progressbar_update_disabled=true;
		window.setTimeout(function(){audio_buffer_progressbar_update_disabled=false; audio_buffer_progressbar_update();},1000);
	}
	progressbar_set(e("openwebrx-bar-audio-buffer"),(underrun)?1:audio_buffer_value/1.5,"Audio "+text+" ["+(audio_buffer_value).toFixed(1)+" s]",overrun||underrun||audio_buffer_value<0.25);
}