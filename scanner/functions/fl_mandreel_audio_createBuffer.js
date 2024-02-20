function fl_mandreel_audio_createBuffer(sp)
{
	var ptr_fileName = heap32[sp>>2];sp+=4;
	var fileName = get_string_from_ptr(ptr_fileName).toLowerCase();
	mandreel_flashaudiolite_createBuffer(fileName);
}