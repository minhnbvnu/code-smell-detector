function audio_prepare_old(data)
{
	//console.log("audio_prepare :: "+data.length.toString());
	//console.log("data.len = "+data.length.toString());
	var dopush=function()
	{
		console.log(audio_last_output_buffer);
		audio_prepared_buffers.push(audio_last_output_buffer);
		audio_last_output_offset=0;
		audio_last_output_buffer=new Float32Array(audio_buffer_size);
		audio_buffer_current_count_debug++;
	};

	var original_data_length=data.length;
	var f32data=new Float32Array(data.length);
	for(var i=0;i<data.length;i++) f32data[i]=data[i]/32768; //convert_i16_f
	data=audio_resampler.process(f32data);
	console.log(data,data.length,original_data_length);
	if(data.length==0) return;
	if(audio_last_output_offset+data.length<=audio_buffer_size)
	{	//array fits into output buffer
		for(var i=0;i<data.length;i++) audio_last_output_buffer[i+audio_last_output_offset]=data[i];
		audio_last_output_offset+=data.length;
		console.log("fits into; offset="+audio_last_output_offset.toString());
		if(audio_last_output_offset==audio_buffer_size) dopush();
	}
	else
	{	//array is larger than the remaining space in the output buffer
		var copied=audio_buffer_size-audio_last_output_offset;
		var remain=data.length-copied;
		for(var i=0;i<audio_buffer_size-audio_last_output_offset;i++) //fill the remaining space in the output buffer
			audio_last_output_buffer[i+audio_last_output_offset]=data[i];///32768;
		dopush();//push the output buffer and create a new one
		console.log("larger than; copied half: "+copied.toString()+", now at: "+audio_last_output_offset.toString());
		for(var i=0;i<remain;i++) //copy the remaining input samples to the new output buffer
			audio_last_output_buffer[i]=data[i+copied];///32768;
		audio_last_output_offset+=remain;
		console.log("larger than; remained: "+remain.toString()+", now at: "+audio_last_output_offset.toString());
	}
	if(audio_buffering && audio_prepared_buffers.length>audio_buffering_fill_to) audio_buffering=false;
}