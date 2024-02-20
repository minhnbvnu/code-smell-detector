function mandreel_audiotag_PreloadAssets()
{
	if ( maudiotagPreloadState == "start" )
	{
		maudiotagPreloadAssets = mandreelFatData.split('\n');
		maudiotagCurrentPreloadAsset = 0;
		maudiotagPreloadState = "preloading";
	}
	else if ( maudiotagPreloadState == "preloading" )
	{
		var queued = false;
		while ( !queued && maudiotagPreloadState != "done" )
		{
			if ( maudiotagCurrentPreloadAsset < maudiotagPreloadAssets.length )
			{
				var params = maudiotagPreloadAssets[maudiotagCurrentPreloadAsset].split(',');
				if ( params[0] == "audiofile" && params[1])
				{
					var duration = params[3];
					var fileNameNoExt = wa_getFileNameNoExt(params[1]);
					maudiotagDurations[fileNameNoExt] = duration|0;
					dump("audiotag duration ("+params[1]+") "+duration);
				}
				else if ( params[0] == "audiotagfile" )
				{
					var type = params[1];
					var filesize = params[3];
					var numsounds = params[4];
					var at = new Audio();
					if ( !maudiotagAudioSpriteFound && at.canPlayType && at.canPlayType("audio/"+type) != "" )
					{
						maudiotagLoadPackFile(params[2],filesize,numsounds,type);
						maudiotagAudioSpriteFound = true;
						queued = true;
					}
				}
				else if ( params[0] == "audiopreloadasync" )
				{
					maudiotagPreloadAsync = true;
				}
				maudiotagCurrentPreloadAsset++;
			}
			else
				queued = true;

			if ( maudiotagCurrentPreloadAsset >= maudiotagPreloadAssets.length )
			{
				maudiotagPreloadState = "done";
				maudiotagPreloadAssets = 0;
			}
		}
	}

	if ( maudiotagPreloadState == "done" )
	{
		setTimeout("MandreelAudioStarted()", 10);
	}
	else
		setTimeout("mandreel_audiotag_PreloadAssets()", 10);
}