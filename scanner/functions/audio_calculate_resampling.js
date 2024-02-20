function audio_calculate_resampling(targetRate)
{ //both at the server and the client
	output_range_max = 12000;
	output_range_min = 8000;
	i = 1;
	while(true)
	{
		audio_server_output_rate = Math.floor(targetRate / i);
		if(audio_server_output_rate < output_range_min)
		{
			audio_client_resampling_factor = audio_server_output_rate = 0;
			divlog("Your audio card sampling rate ("+targetRate.toString()+") is not supported.<br />Please change your operating system default settings in order to fix this.",1);
		}
		if(audio_server_output_rate >= output_range_min	&& audio_server_output_rate <= output_range_max) break; //okay, we're done
		i++;
	}
	audio_client_resampling_factor=i;
	console.log("audio_calculate_resampling() :: "+audio_client_resampling_factor.toString()+", "+audio_server_output_rate.toString());
}