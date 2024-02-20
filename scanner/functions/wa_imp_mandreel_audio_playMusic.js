function wa_imp_mandreel_audio_playMusic(fileName)
{
	var fileNameNoExt = wa_getFileNameNoExt(fileName);
	var fileNameFull = g_mandreel_working_folder + fileNameNoExt + ".ogg";

	if ( wa_mandreelMusicElementFilename != fileNameFull )
	{
		wa_imp_mandreel_audio_stopMusic(0);
		var audio = document.createElement("audio");
		var type = fileNameFull.slice(fileNameFull.lastIndexOf(".")+1);
		switch(type){
			case "mp3" : type = "mpeg"; break;
			case "ogg" : type = "ogg"; break;
			case "wav" : type = "wav"; break;
			default : throw("'" + fileNameFull + "' is not a recognized audio file");
		}

		// set correct id for lookup, loading method and data types
		audio.setAttribute("type", "audio/" + type);
		var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
		if ( is_chrome )
			audio.setAttribute("loop", "loop");
		else
			audio.addEventListener('ended', function(){this.currentTime = 0;}, false);
		audio.volume = wa_mandreelMusicElementVolume;
		audio.setAttribute("autoplay", "true");
		audio.setAttribute("src", fileNameFull);


		// include into list and document
		document.body.appendChild(audio);
		wa_mandreelMusicElement = audio;
		wa_mandreelMusicElementFilename = fileNameFull;
	}
}