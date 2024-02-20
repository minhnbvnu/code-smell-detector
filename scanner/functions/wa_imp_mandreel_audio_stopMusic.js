function wa_imp_mandreel_audio_stopMusic()
{
	if ( wa_mandreelMusicElement != null )
	{
		document.body.removeChild(wa_mandreelMusicElement);
		wa_mandreelMusicElement = null;
		wa_mandreelMusicElementFilename = "";
	}
}