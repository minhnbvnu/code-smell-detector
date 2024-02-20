function at_imp_mandreel_audio_playChannel(filename,channel,vol,loop,pitch)
{
	at_imp_mandreel_audio_stopChannel(channel);
	var fileNameNoExt = wa_getFileNameNoExt(filename);
	var time = maudioSecondsPos[fileNameNoExt];
	if ( time != null )
	{
		console.log("play "+fileNameNoExt+" "+time);
		if ( maudiotagAvailableChannels.length > 0 )
		{
			var sound = maudiotagAvailableChannels.pop();
			var duration = maudiotagDurations[fileNameNoExt];
			sound.currentTime = time;
			console.log("OK "+sound.currentTime);
			sound.play();
			maudiotagChannels[channel] = sound;
			maudioChannelEnd[channel] = time+(duration/1000.0);
		}
	}
	else
	{
		console.log("not found play "+fileNameNoExt);
	}
}