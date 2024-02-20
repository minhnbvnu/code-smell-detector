function audio_prepare(data)
{

	//audio_rebuffer.push(sdrjs.ConvertI16_F(data));//no resampling
	//audio_rebuffer.push(audio_resampler.process(sdrjs.ConvertI16_F(data)));//resampling without ADPCM
	if(audio_compression=="none")
		audio_rebuffer.push(audio_resampler.process(gain_ff(volume,sdrjs.ConvertI16_F(data))));//resampling without ADPCM
	else if(audio_compression=="adpcm")
		audio_rebuffer.push(audio_resampler.process(gain_ff(volume,sdrjs.ConvertI16_F(audio_codec.decode(data))))); //resampling & ADPCM
	else return;

	//console.log("prepare",data.length,audio_rebuffer.remaining());
	while(audio_rebuffer.remaining())
	{
		audio_prepared_buffers.push(audio_rebuffer.take());
		audio_buffer_current_count_debug++;
	}
	if(audio_buffering && audio_prepared_buffers.length>audio_buffering_fill_to) { console.log("buffers now: "+audio_prepared_buffers.length.toString()); audio_buffering=false; }
}