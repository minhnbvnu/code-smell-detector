function _mandreelAppStartReady()
{
	if ( mandreelAppPlatform == "nacl" )
	{
		wa_initWebAudio();
		mandreel_webAudio_PreloadAssets();
	}
	else
	{
		if ( mandreelAppStartStateFunc )
		{
			mandreelAppStartRenderWebGL();
			mandreelAppStartStateFunc("ready",mandreelAppCanvasWidth,mandreelAppCanvasHeight);
		}
	}
}