function mandreel_webAudio_preloadNextAudioFile()
{
	if ( webAudioPreloadAudioFiles.length > webAudioPreloadCurrentFile )
	{
		var audioFile = webAudioPreloadAudioFiles[webAudioPreloadCurrentFile];
		if ( audioFile.fileName == null )
		{
			webAudioPreloadCurrentFile++;
			setTimeout("mandreel_webAudio_preloadNextAudioFile()",10);
		}
		else
		{
			var bufferdata = new Uint8Array(audioFile.fileSize);
			bufferdata.set(webAudioPreloadBytes.subarray(audioFile.position,audioFile.position+audioFile.fileSize));
			dump("async preload audio file ("+audioFile.fileName+")");
			webAudioContext.decodeAudioData(bufferdata.buffer,mandreel_webAudio_preloadNextAudioFileOK,mandreel_webAudio_preloadNextAudioFileError);
		}
	}
	else
	{
		webAudioPreloadAudioFiles = null;
		webAudioPreloadBytes = null;
		dump("finished preloading audio files async");
	}
}