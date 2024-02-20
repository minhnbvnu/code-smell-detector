function mandreel_flashlite_startPreload()
{
	mandreel_sendmsg_flash("init "+g_mandreel_working_folder);
	// preload sounds
	var FatLines = mandreelFatData.split('\n');
	for ( var i=0;i<FatLines.length;++i )
	{
		var params = FatLines[i].replace('\r','').split(',');
		if ( params[0] == "audiofile" && params[1] )
		{
			var sync_load = true;
			if (params[2] && (params[2]&1) == 0)
				sync_load = false;

			if (sync_load)
			{

				mandreel_flashaudiolite_createBuffer(params[1]);
			}
		}
	}
	setTimeout("mandreel_flashlite_checkPreloadFinished()", 10);
}