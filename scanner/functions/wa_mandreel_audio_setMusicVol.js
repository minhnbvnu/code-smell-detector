function wa_mandreel_audio_setMusicVol(sp)
{
	var vol = heapFloat[sp>>2];sp+=4;
	wa_imp_mandreel_audio_setMusicVol(vol);
}