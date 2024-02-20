function mandreel_flash_sockets_load_flash(callback)
{
	mandreel_flash_socket_callback = callback;
	var failed = "";
	try
	{
		var mandreelSocketsSwf = g_mandreel_working_folder+"mandreelflashsockets.swf";
		var swf = swfobject.createSWF({ data:mandreelSocketsSwf, width:"0", height:"0", allowScriptAccess:"always" }, { menu:"false" }, "FlashDivSockets");
		if ( !swf )
			failed  = "Unable to open MandreelFlashSockets.swf";
	}
	catch(err)
	{
		failed  = err;
	}
}