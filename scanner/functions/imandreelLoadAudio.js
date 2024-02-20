function imandreelLoadAudio()
{
	g_mandreel_working_folder = mandreelAppWorkingFolder;
	if ( mandreelAppReadDataFromLocalHost )
		g_mandreel_working_folder = mandreelAppLocalHost+"/"+mandreelAppWorkingFolder;

	// load audio
	if ( mandreelAppStartStateFunc )
		mandreelAppStartStateFunc("loadingAudio","");
	mandreel_start_audio(mandreelAppHostedAudioServer,mandreelAppHostedAudioUrl,_mandreelAppAudioReady);
}