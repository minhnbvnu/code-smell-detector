function mandreel_start_audio(audioServer, audioUrl,startedFunction)
{
	mandreel_audio_startedFunction = startedFunction;

	// Check audio driver data availability
	var webAudioDataAvailable = false;
	var flashAudioDataAvailable = false;
	var flashLiteAudioDataAvailable = false;
	var audiotagsDataAvailable = false;
	var FatLines = mandreelFatData.split('\n');
	for ( var i=0;i<FatLines.length;++i )
	{
		var params = FatLines[i].split(',');
		if ( params[0] == "audiodriver" )
		{
			var data = params[1];
			data = data.replace('\r','');
			if ( data == "webaudio" )
				webAudioDataAvailable = true;
			else if ( data == "flash" )
				flashAudioDataAvailable = true;
			else if ( data == "flashlite" )
				flashLiteAudioDataAvailable = true;
			else if ( data == "audiotag" )
				audiotagsDataAvailable = true;
		}
	}


	// Init audio driver
	{
		// webaudio
		if ( webAudioDataAvailable && MandreelAudioDriver == "null" )
		{
			try	{ webAudioContext = new webkitAudioContext(); } catch(err) { webAudioContext = 0; }
			if ( webAudioContext )
			{
				wa_MainAudioDriver();
				MandreelAudioDriver = "webAudio";
			}
		}
		// flash
		if ( flashAudioDataAvailable && MandreelAudioDriver == "null" )
		{
			MandreelAudioDriver = "flash";
			if ( audioServer == null )
			{
				audioServer = "";
				audioUrl = "";
			}
			fl_MainAudioDriver(audioServer,audioUrl);
		}
		// flashlite
		if ( flashLiteAudioDataAvailable && MandreelAudioDriver == "null" )
		{
			MandreelAudioDriver = "flashlite";
			mandreel_flashaudio_lite = true;
			fl_MainAudioDriver("","");
		}
		// audiotags
		if ( audiotagsDataAvailable && MandreelAudioDriver == "null" )
		{
			MandreelAudioDriver = "audiotag";
			at_MainAudioDriver();
		}
		// null
		if ( MandreelAudioDriver == "null" )
		{
			null_MainAudioDriver();
		}
	}
	dump("AudioDriver ("+MandreelAudioDriver+")");
}