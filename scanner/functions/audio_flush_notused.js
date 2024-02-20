function audio_flush_notused()
{
	if (audio_buffer_current_size>audio_buffer_maximal_length_sec*audio_context.sampleRate)
	{
		add_problem("audio overrun");
		console.log("audio_flush() :: size: "+audio_buffer_current_size.toString()+" allowed: "+(audio_buffer_maximal_length_sec*audio_context.sampleRate).toString());
		while (audio_buffer_current_size>audio_buffer_maximal_length_sec*audio_context.sampleRate*0.5)
		{
			audio_buffer_current_size-=audio_received[0].length;
			audio_received.splice(0,1);
		}
	}
}