function audiotagParsePreloadFile(response,numsounds,atype)
{
	var pos = 0;
	var bytes = new Uint8Array(response);
	var i = 0;
	if ( webAudioPreloadAsync )
		webAudioPreloadBytes = bytes;
	var secondsPos = 0.0;
	while ( pos < bytes.byteLength && i < numsounds)
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
		var fileNameNoExt = wa_getFileNameNoExt(fileName);
		var duration = maudiotagDurations[fileNameNoExt];
		dump("afile ("+fileName+") duration("+duration+") posseconds("+secondsPos+")");
		maudioSecondsPos[fileNameNoExt] = secondsPos;
		secondsPos += duration / 1000.0;
		secondsPos += 0.25;
		dump("second "+i+" "+secondsPos);

		i++;
	}

	// contents
	var contentSize = bytes.byteLength - pos;
	var bufferdata = new Uint8Array(contentSize);
	bufferdata.set(bytes.subarray(pos,pos+contentSize));
	var ascii = '';
	for (var i=0; i<bufferdata.length; i++)
		ascii += String.fromCharCode(bufferdata[i]);
	var base64 = btoa(ascii);
	audiotagAudioSprite = "data:audio/"+atype+";base64," + base64;

	if ( webAudioPreloadAsync )
	{
		dump("started preloading audio files async");
		setTimeout("mandreel_webAudio_preloadNextAudioFile()",10);
	}

	audiotagCreateChannel(0);
}