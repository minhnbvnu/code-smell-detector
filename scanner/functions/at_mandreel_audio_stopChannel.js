function at_mandreel_audio_stopChannel(sp)
{
	var ptr_fileName = heap32[sp>>2];sp+=4;
	var channel = heap32[sp>>2];sp+=4;
	var index = heapFloat[sp>>2];sp+=4;
	at_imp_mandreel_audio_stopChannel(channel);
}