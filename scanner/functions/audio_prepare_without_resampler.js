function audio_prepare_without_resampler(data)
{
	audio_rebuffer.push(sdrjs.ConvertI16_F(data));
	console.log("prepare",data.length,audio_rebuffer.remaining());
	while(audio_rebuffer.remaining())
	{
		audio_prepared_buffers.push(audio_rebuffer.take());
		audio_buffer_current_count_debug++;
	}
	if(audio_buffering && audio_prepared_buffers.length>audio_buffering_fill_to) audio_buffering=false;
}