function mandreel_audio_getAudioDriverName(sp)
{
	var name_ptr = heap32[sp>>2];sp+=4;
	fill_ptr_from_string(name_ptr, MandreelAudioDriver);
}