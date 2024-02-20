function wa_imp_mandreel_audio_setChannelVolume(channel,vol)
{
	if ( webAudioContext )
	{
		var gain = webAudioGain[channel];
		if ( gain != null )
			gain.gain.value = vol;
	}
}