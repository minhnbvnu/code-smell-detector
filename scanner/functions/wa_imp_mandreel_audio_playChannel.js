function wa_imp_mandreel_audio_playChannel(fileName,channel,vol,loop,pitch)
{
	if ( webAudioContext )
	{
		var fileNameNoExt = wa_getFileNameNoExt(fileName);
		var buffer = webAudioBuffers[fileNameNoExt];
		if ( buffer == null || buffer == "invalid" )
		{
			if ( webAudioPreloadAudioFiles != null )
			{
				var i = 0;
				while ( i < webAudioPreloadAudioFiles.length )
				{
					var audioFile = webAudioPreloadAudioFiles[i];
					if ( audioFile.fileName == fileNameNoExt )
					{
						var bufferdata = new Uint8Array(audioFile.fileSize);
						bufferdata.set(webAudioPreloadBytes.subarray(audioFile.position,audioFile.position+audioFile.fileSize));
						webAudioBuffers[audioFile.fileName] = webAudioContext.createBuffer(bufferdata.buffer, false);
						dump("**** preload audio file ("+audioFile.fileName+"), forced by playChannel");
						audioFile.fileName = null;
						i = webAudioPreloadAudioFiles.length;
					}
					else
					{
						++i;
					}
				}
			}
		}
		if ( buffer == null || buffer == "invalid" )
		{
			mandreel_webAudio_queueLoadBuffer(fileName);
			buffer = webAudioBuffers[fileNameNoExt];
		}
		if ( buffer != null && buffer != "invalid" )
		{
			var chn = webAudioContext.createBufferSource();
			var gain = webAudioContext.createGainNode();
			if ( chn && gain )
			{
				webAudioChannels[channel] = chn;
				webAudioGain[channel] = gain;
				chn.buffer = buffer;
				chn.connect(gain);
				gain.connect(webAudioContext.destination);
				var bLoop = loop != 0;
				chn.loop = bLoop;
				gain.gain.value = vol;
				chn.playbackRate.value = pitch;
				chn.noteOn(0);
				//dump("webAudio: PlayChannel "+channel+" "+fileName+" "+vol+" "+bLoop+" "+pitch);
			}
		}
	}
}