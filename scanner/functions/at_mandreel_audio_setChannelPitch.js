function at_mandreel_audio_setChannelPitch(sp)
{
	var channel = heap32[sp>>2];sp+=4;
	var pitch = heapFloat[sp>>2];sp+=4;
	//wa_imp_mandreel_audio_setChannelPitch(channel,pitch);
}