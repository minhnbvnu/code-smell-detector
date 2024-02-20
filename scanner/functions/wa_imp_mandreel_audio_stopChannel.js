function wa_imp_mandreel_audio_stopChannel(channel)
{
	if ( webAudioContext )
	{
		var chn = webAudioChannels[channel];
		if ( chn != null )
		{
			//dump("webAudio: StopChannel "+channel);
			chn.noteOff(0);
			webAudioChannels[channel] = null;
			webAudioGain[channel] = null;
		}
	}
}