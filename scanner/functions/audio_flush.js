function audio_flush()
{
	flushed=false;
	we_have_more_than=function(sec){ return sec*audio_context.sampleRate<audio_prepared_buffers.length*audio_buffer_size; }
	if(we_have_more_than(audio_buffer_maximal_length_sec)) while(we_have_more_than(audio_buffer_decrease_to_on_overrun_sec))
	{
		if(!flushed) audio_buffer_progressbar_update();
		flushed=true;
		audio_prepared_buffers.shift();
	}
	//if(flushed) add_problem("audio overrun");
}