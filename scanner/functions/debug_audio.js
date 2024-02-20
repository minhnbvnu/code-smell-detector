function debug_audio()
{
	if(audio_debug_time_start==0) return; //audio_init has not been called
	time_now=(new Date()).getTime();
	audio_debug_time_since_last_call=(time_now-audio_debug_time_last_start)/1000;
	audio_debug_time_last_start=time_now; //now
	audio_debug_time_taken=(time_now-audio_debug_time_start)/1000;
	kbps_mult=(audio_compression=="adpcm")?8:16;
	//e("openwebrx-audio-sps").innerHTML=
	//	((audio_compression=="adpcm")?"ADPCM compressed":"uncompressed")+" audio downlink:<br/> "+(audio_buffer_current_size_debug*kbps_mult/audio_debug_time_since_last_call).toFixed(0)+" kbps ("+
	//	(audio_buffer_all_size_debug*kbps_mult/audio_debug_time_taken).toFixed(1)+" kbps avg.), feed at "+
	//	((audio_buffer_current_count_debug*audio_buffer_size)/audio_debug_time_taken).toFixed(1)+" sps output";

	var audio_speed_value=audio_buffer_current_size_debug*kbps_mult/audio_debug_time_since_last_call;
	progressbar_set(e("openwebrx-bar-audio-speed"),audio_speed_value/500000,"Audio stream ["+(audio_speed_value/1000).toFixed(0)+" kbps]",false);

	var audio_output_value=(audio_buffer_current_count_debug*audio_buffer_size)/audio_debug_time_taken;
	progressbar_set(e("openwebrx-bar-audio-output"),audio_output_value/55000,"Audio output ["+(audio_output_value/1000).toFixed(1)+" ksps]",audio_output_value>55000||audio_output_value<10000);

	audio_buffer_progressbar_update();

	var network_speed_value=debug_ws_data_received/audio_debug_time_taken;
	progressbar_set(e("openwebrx-bar-network-speed"),network_speed_value*8/2000,"Network usage ["+(network_speed_value*8).toFixed(1)+" kbps]",false);

	audio_buffer_current_size_debug=0;

	if(waterfall_measure_minmax) waterfall_measure_minmax_print();
}