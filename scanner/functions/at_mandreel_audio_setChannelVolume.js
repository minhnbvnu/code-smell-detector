function at_mandreel_audio_setChannelVolume(sp)
{
	var channel = heap32[sp>>2];sp+=4;
	var vol = heapFloat[sp>>2];sp+=4;
	//wa_imp_mandreel_audio_setChannelVolume(channel,vol);
}