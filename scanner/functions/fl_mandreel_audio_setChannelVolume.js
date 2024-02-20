function fl_mandreel_audio_setChannelVolume(sp)
{
	var channel = heap32[sp>>2];sp+=4;
	var vol = heapFloat[sp>>2];sp+=4;

	mandreel_sendmsg_flash("setChannelVolume "+channel+" "+vol);
}