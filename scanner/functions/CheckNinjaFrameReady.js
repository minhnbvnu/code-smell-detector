function CheckNinjaFrameReady()
{
	try
	{
		mandreel_sendmsg_flash("loadFlash");
	}
	catch(err)
	{
	}
	if ( !ninjaLoaded )
		setTimeout("CheckNinjaFrameReady()", 1000);
}