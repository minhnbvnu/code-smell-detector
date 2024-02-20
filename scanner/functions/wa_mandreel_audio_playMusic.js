function wa_mandreel_audio_playMusic(sp)
{
	var ptr_fileName = heap32[sp>>2];sp+=4;
	var fileName = get_string_from_ptr(ptr_fileName).toLowerCase();
	wa_imp_mandreel_audio_playMusic(fileName);
}