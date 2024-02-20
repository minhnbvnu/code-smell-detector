function wa_imp_mandreel_audio_setChannelPitch(channel,pitch)
{
	if ( webAudioContext )
	{
		var chn = webAudioChannels[channel];
		if ( chn != null )
		{
			chn.playbackRate.value = pitch;
		}
	}
}