function fl_mandreel_audio_setChannelPan(sp)
{
	var channel = heap32[sp>>2];sp+=4;
	var pan = heapFloat[sp>>2];sp+=4;
	mandreel_sendmsg_flash("setChannelPan "+channel+" "+pan);
}