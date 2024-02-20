function mandreelFatLoaded()
{
	if ( mandreelAppPlatform == "nacl" )
	{
		g_mandreel_working_folder = mandreelAppWorkingFolder;
		if ( mandreelAppReadDataFromLocalHost )
			g_mandreel_working_folder = mandreelAppLocalHost+"/"+mandreelAppWorkingFolder;

		// load audio
		if ( mandreelAppStartStateFunc )
			mandreelAppStartStateFunc("loadingAudio","");
		_mandreelAppAudioReady();
	}
	else
		mandreelLoadMandreelJsScript();
}