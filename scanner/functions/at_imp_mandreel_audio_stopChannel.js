function at_imp_mandreel_audio_stopChannel(channel)
{
	var sound = maudiotagChannels[channel];
	if ( sound != null )
	{
		sound.pause();
		maudiotagAvailableChannels.push(sound);
		maudiotagChannels[channel] = null;
	}
}