function mandreelAppFullscreen(enable)
{
	var canvas = Mandreel_document.getElementById(mandreelAppCanvasName);
	if ( mandreelAppPlatform == "webgl" || mandreelAppPlatform == "canvas" )
	{
		if (canvas)
		{
			if (enable)
				canvas.requestFullScreen();
			else
				Mandreel_document.cancelFullScreen();
		}
	}
}