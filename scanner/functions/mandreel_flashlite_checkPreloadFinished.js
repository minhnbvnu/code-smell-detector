function mandreel_flashlite_checkPreloadFinished()
{
	if ( !fl_internal_mandreel_audio_checkBuffersPending() )
		MandreelAudioStarted();
	else
		setTimeout("mandreel_flashlite_checkPreloadFinished()", 10);
}