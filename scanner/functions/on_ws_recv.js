function on_ws_recv(evt)
{
	if(!(evt.data instanceof ArrayBuffer)) { divlog("on_ws_recv(): Not ArrayBuffer received...",1); return; }
	//
	debug_ws_data_received+=evt.data.byteLength/1000;
	first4Chars=getFirstChars(evt.data,4);
    first3Chars=first4Chars.slice(0,3);
	if(first3Chars=="CLI")
	{
		var stringData=arrayBufferToString(evt.data);
		if(stringData.substring(0,16)=="CLIENT DE SERVER") divlog("Server acknowledged WebSocket connection.");

	}
	if(first3Chars=="AUD")
	{
		var audio_data;
		if(audio_compression=="adpcm") audio_data=new Uint8Array(evt.data,4)
		else audio_data=new Int16Array(evt.data,4);
		audio_prepare(audio_data);
		audio_buffer_current_size_debug+=audio_data.length;
		audio_buffer_all_size_debug+=audio_data.length;
		if(!(ios||is_chrome) && (audio_initialized==0 && audio_prepared_buffers.length>audio_buffering_fill_to)) audio_init()
	}
	else if(first3Chars=="FFT")
	{
		//alert("Yupee! Doing FFT");
        //if(first4Chars=="FFTS") console.log("FFTS"); 
		if(fft_compression=="none") waterfall_add_queue(new Float32Array(evt.data,4));
		else if(fft_compression="adpcm")
		{
			fft_codec.reset();

			var waterfall_i16=fft_codec.decode(new Uint8Array(evt.data,4));
			var waterfall_f32=new Float32Array(waterfall_i16.length-COMPRESS_FFT_PAD_N);
			for(var i=0;i<waterfall_i16.length;i++) waterfall_f32[i]=waterfall_i16[i+COMPRESS_FFT_PAD_N]/100;
            if(first4Chars=="FFTS") secondary_demod_waterfall_add_queue(waterfall_f32); //TODO digimodes
            else waterfall_add_queue(waterfall_f32);
		}
	} 
    else if(first3Chars=="DAT")
    {
        //secondary_demod_push_binary_data(new Uint8Array(evt.data,4));
        secondary_demod_push_data(arrayBufferToString(evt.data).substring(4));
        //console.log("DAT");
	} 
    else if(first3Chars=="MSG")
	{
		/*try
		{*/
			var stringData=arrayBufferToString(evt.data);
			params=stringData.substring(4).split(" ");
			for(i=0;i<params.length;i++)
			{
				param=params[i].split("=");
				switch(param[0])
				{
					case "setup":
						waterfall_init();
						audio_preinit();
						break;
					case "bandwidth":
						bandwidth=parseInt(param[1]);
						break;
					case "center_freq":
						center_freq=parseInt(param[1]); //there was no ; and it was no problem... why?
						break;
					case "fft_size":
						fft_size=parseInt(param[1]);
						break;
					case "secondary_fft_size":
						secondary_fft_size=parseInt(param[1]);
						break;
                    case "secondary_setup":
                        secondary_demod_init_canvases();
                        break;
                    case "if_samp_rate":
                        if_samp_rate=parseInt(param[1]);
                        break;
                    case "secondary_bw":
                        secondary_bw=parseFloat(param[1]);
                        break;
					case "fft_fps":
						fft_fps=parseInt(param[1]);
						break;
					case "audio_compression":
						audio_compression=param[1];
						divlog( "Audio stream is "+ ((audio_compression=="adpcm")?"compressed":"uncompressed")+"." )
						break;
					case "fft_compression":
						fft_compression=param[1];
						divlog( "FFT stream is "+ ((fft_compression=="adpcm")?"compressed":"uncompressed")+"." )
						break;
					case "cpu_usage":
						var server_cpu_usage=parseInt(param[1]);
						progressbar_set(e("openwebrx-bar-server-cpu"),server_cpu_usage/100,"Server CPU ["+param[1]+"%]",server_cpu_usage>85);
						break;
					case "clients":
						var clients_num=parseInt(param[1]);
						progressbar_set(e("openwebrx-bar-clients"),clients_num/max_clients_num,"Clients ["+param[1]+"]",clients_num>max_clients_num*0.85);
						break;
					case "max_clients":
						max_clients_num=parseInt(param[1]);
						break;
					case "s":
						smeter_level=parseFloat(param[1]);
						setSmeterAbsoluteValue(smeter_level);
						break;
				}
			}
		/*}
		catch(err)
		{
			divlog("Received invalid message over WebSocket.");
		}*/
	}

}