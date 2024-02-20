function mandreel_webAudio_PreloadAssets()
{
	/*if ( mwebAudioPreloadState == "start" )
	{
		//dump("webaudio start");
			mwebAudioPreloadRequest = new XMLHttpRequest();
			var url = g_mandreel_working_folder+"mandreel.fat.dat";
			mwebAudioPreloadRequest.open("GET", url, true);
			mwebAudioPreloadRequest.onreadystatechange = function()
			{
				if (mwebAudioPreloadRequest.readyState != 4) return;
				if ( mwebAudioPreloadRequest.status != 404 && mwebAudioPreloadRequest.response != null )
					mwebAudioPreloadState = "parseFat";
				else
				{
					mwebAudioPreloadState = "done";
					dump("error pre-loading audio assets, status("+mwebAudioPreloadRequest.status+")");
				}
			}
			mwebAudioPreloadState = "loadingFat";
			mwebAudioPreloadRequest.send();
	}
	else if ( mwebAudioPreloadState == "parseFat" )*/
	if ( mwebAudioPreloadState == "start" )
	{
		//mwebAudioPreloadAssets = mwebAudioPreloadRequest.response.split('\n');
		//mwebAudioPreloadRequest = 0;
		mwebAudioPreloadAssets = mandreelFatData.split('\n');
		mwebAudioCurrentPreloadAsset = 0;
		mwebAudioPreloadState = "preloading";
	}
	else if ( mwebAudioPreloadState == "preloading" )
	{
		//dump("webaudio preloading");
		var queued = false;
		while ( !queued && mwebAudioPreloadState != "done" )
		{
			if ( mwebAudioCurrentPreloadAsset < mwebAudioPreloadAssets.length )
			{
				var params = mwebAudioPreloadAssets[mwebAudioCurrentPreloadAsset].split(',');
				if ( params[0] == "audiofile" && params[1])
				{
					var sync_load = true;
					if (params[2] && (params[2]&1) == 0)
						sync_load = false;

					if (sync_load)
					{
						mandreel_webAudio_queueLoadBuffer(params[1],mwebCallbackAsyncPreload);
						mwebTotalPreloadingFiles++;
						queued = true;
					}

				}
				else if ( params[0] == "audiopreloadfile" )
				{
					mandreel_webAudio_queueLoadPackedBuffers(params[1],mwebCallbackAsyncPreload);
					var size_pog_file = parseInt(params[2], 10);
					mandreel_total_pogfile_size = size_pog_file;
					mwebTotalPreloadingFiles++;
					queued = true;
				}
				else if ( params[0] == "audiopreloadasync" )
				{
					webAudioPreloadAsync = true;
				}
				mwebAudioCurrentPreloadAsset++;
			}
			else
				queued = true;

			if ( mwebAudioCurrentPreloadAsset >= mwebAudioPreloadAssets.length )
			{
				if (mwebCurrentPreloadingFiles == mwebTotalPreloadingFiles)
				{
					mwebAudioPreloadState = "done";
					mwebAudioPreloadAssets = 0;
				}
			}
		}
	}

	if ( mwebAudioPreloadState == "done" )
	{
		if ( mandreelAppPlatform == "nacl" )
			setTimeout("MandreelAudioStartedNacl()", 10);
		else
			setTimeout("MandreelAudioStarted()", 10);
	}
	else
		setTimeout("mandreel_webAudio_PreloadAssets()", 10);
}