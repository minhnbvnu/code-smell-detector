function mandreel_webAudio_queueLoadBuffer(fileName, callback)
{
	//dump("mandreel_webAudio_queueLoadBuffer "+fileName);
	if ( webAudioContext )
	{
		var fileNameNoExt = wa_getFileNameNoExt(fileName);
		var buffer = webAudioBuffers[fileNameNoExt];
		if ( buffer == null && buffer != "invalid" )
		{
			if ( fileNameNoExt != "" )
			{
				if (wa_mandreel_cache_audio_files == true)
				{
					webAudioBuffers[fileNameNoExt] = "invalid";

					mandreel_webAudio_cacheFile(fileName, function(response) {

						if (callback != null)
							callback();

						if ( response != null )
							webAudioBuffers[fileNameNoExt] = webAudioContext.createBuffer(response, false);
						else
							webAudioBuffers[fileNameNoExt] = "invalid";
					} );
					return;
				}

				var url = g_mandreel_working_folder+fileNameNoExt+".ogg";
				dump("webAudio: loading buffer ("+fileName+") url("+url+")");
				webAudioBuffers[fileNameNoExt] = "invalid";
				var request = new XMLHttpRequest();
				request.open("GET", url, true);
				request.responseType = "arraybuffer";
				request.onreadystatechange = function()
				{
					if (request.readyState == 4)
					{
						if (callback != null)
							callback();

						if (request.status == 404) return;
						//dump("webAudio: loaded buffer "+request.status);
						if ( request.response != null )
							webAudioBuffers[fileNameNoExt] = webAudioContext.createBuffer(request.response, false);
						else
							webAudioBuffers[fileNameNoExt] = "invalid";
					}
				}
				request.send();
			}
			else
				webAudioBuffers[fileNameNoExt] = "invalid";
		}
	}
}