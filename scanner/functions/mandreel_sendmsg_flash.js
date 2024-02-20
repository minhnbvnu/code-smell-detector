function mandreel_sendmsg_flash(msg)
{
	if ( mandreel_flashaudio_server != "" )
	{
		var iframeWin = document.getElementById("ninja-iframe").contentWindow;
		iframeWin.postMessage(msg,mandreel_flashaudio_server);
	}
	else
	{
		var flashMovie=mandreel_audio_getFlashMovieObject("FlashDivAudio");
		if ( flashMovie != null )
			flashMovie.receiveMessage(msg);
		else
			dump("error: flashMovie not found");
	}
}