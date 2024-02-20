function wa_imp_mandreel_audio_setMusicVol(vol)
{
	wa_mandreelMusicElementVolume = vol;
	if ( wa_mandreelMusicElement != null )
	{
		wa_mandreelMusicElement.volume = wa_mandreelMusicElementVolume;
	}
}