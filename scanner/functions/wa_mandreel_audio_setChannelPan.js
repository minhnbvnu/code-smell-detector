function wa_mandreel_audio_setChannelPan(sp)
{
	var channel = heap32[sp>>2];sp+=4;
	var pan = heapFloat[sp>>2];sp+=4;
	wa_imp_mandreel_audio_setChannelPan(channel,pan);
}