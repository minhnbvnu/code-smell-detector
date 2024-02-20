function fl_mandreel_audio_playChannel(sp)
{
	var ptr_fileName = heap32[sp>>2];sp+=4;
	var channel = heap32[sp>>2];sp+=4;
	var vol = heapFloat[sp>>2];sp+=4;
	var loop = heap32[sp>>2];sp+=4;
	var pitch = heapFloat[sp>>2];sp+=4;
	var fileName = get_string_from_ptr(ptr_fileName).toLowerCase();
	mandreel_sendmsg_flash("playChannel "+fileName+" "+channel+" "+loop+" "+vol+" "+pitch);
	r_g0 = 0;
}