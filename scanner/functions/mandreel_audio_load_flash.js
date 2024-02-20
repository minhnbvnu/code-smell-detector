function mandreel_audio_load_flash()
{
	var failed = "";


	try
	{
		var mandreelAudioSwf = g_mandreel_working_folder+"mandreelaudio.swf";
		if ( mandreel_flashaudio_lite )
			mandreelAudioSwf = g_mandreel_working_folder+"mandreelaudiolite.swf";
		var swf = swfobject.createSWF({ data:mandreelAudioSwf, width:"0", height:"0", allowScriptAccess:"always" }, { menu:"false" }, "FlashDivAudio");
		if ( !swf )
			failed  = "swfobject.js not avaiable or Unable to open "+mandreelAudioSwf;
	}
	catch(err)
	{
		failed  = err;
	}

	if (failed == "" && !swfobject.hasFlashPlayerVersion("9.0.0"))
		failed = "flash player not found";

	if ( failed != "" )
	{
		dump("Failed to create flash audio driver ("+failed+"). Null driver will be used.");
		MandreelAudioDriver = "null";
		null_MainAudioDriver();
	}
}