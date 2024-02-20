function audio_onprocess_notused(e)
{
	//https://github.com/0xfe/experiments/blob/master/www/tone/js/sinewave.js
	if(audio_received.length==0)
	{ add_problem("audio underrun"); return; }
	output = e.outputBuffer.getChannelData(0);
	int_buffer = audio_received[0];
	read_remain = audio_buffer_size;
	//audio_buffer_maximal_length=120;

	obi=0; //output buffer index
	debug_str=""
	while(1)
	{
		if(int_buffer.length-audio_buffer_index>read_remain)
		{
			for (i=audio_buffer_index; i<audio_buffer_index+read_remain; i++)
				output[obi++] = int_buffer[i]/32768;
			//debug_str+="added whole ibl="+int_buffer.length.toString()+" abi="+audio_buffer_index.toString()+" "+(int_buffer.length-audio_buffer_index).toString()+">"+read_remain.toString()+" obi="+obi.toString()+"\n";
			audio_buffer_index+=read_remain;
			break;
		}
		else
		{
			for (i=audio_buffer_index; i<int_buffer.length; i++)
				output[obi++] = int_buffer[i]/32768;
			read_remain-=(int_buffer.length-audio_buffer_index);
			audio_buffer_current_size-=audio_received[0].length;
			/*if (audio_received.length>audio_buffer_maximal_length)
			{
				add_problem("audio overrun");
				audio_received.splice(0,audio_received.length-audio_buffer_maximal_length);
			}
			else*/
				audio_received.splice(0,1);
			//debug_str+="added remain, remain="+read_remain.toString()+" abi="+audio_buffer_index.toString()+" alen="+int_buffer.length.toString()+" i="+i.toString()+" arecva="+audio_received.length.toString()+" obi="+obi.toString()+"\n";
			audio_buffer_index = 0;
			if(audio_received.length == 0 || read_remain == 0) return;
			int_buffer = audio_received[0];
		}
	}
	//debug_str+="obi="+obi.toString();
	//alert(debug_str);
}