function webAudioParsePreloadFile(response)
{
	var pos = 4;
	var bytes = new Uint8Array(response);
	var i = 0;
	if ( webAudioPreloadAsync )
		webAudioPreloadBytes = bytes;
	while ( pos < bytes.byteLength )
	{
		// filename
		var fileName = "";
		while ( bytes[pos] != 0 )
		{
			fileName += String.fromCharCode(bytes[pos]);
			pos++;
		}
		pos++;
		// filesize
		var filesize = bytes[pos] | (bytes[pos+1]<<8) | (bytes[pos+2]<<16) | (bytes[pos+3]<<24);
		pos += 4;

		// contents
		var fileNameNoExt = wa_getFileNameNoExt(fileName);
		if ( webAudioPreloadAsync )
		{
			var audioFile =
			{
				fileName : fileNameNoExt,
				fileSize : filesize,
				position : pos
			};
			webAudioPreloadAudioFiles[i] = audioFile;
		}
		else
		{
			var bufferdata = new Uint8Array(filesize);
			bufferdata.set(bytes.subarray(pos,pos+filesize));
			webAudioBuffers[fileNameNoExt] = webAudioContext.createBuffer(bufferdata.buffer, false);
			dump("preload audio file ("+fileName+")");
		}

		pos += filesize;
		i++;
	}
	if ( webAudioPreloadAsync )
	{
		dump("started preloading audio files async");
		setTimeout("mandreel_webAudio_preloadNextAudioFile()",10);
	}
}