function MandreelInterSwfProgress(mode, percentage, bytes, totalbytes)
{
	imandreel_update_load(bytes, totalbytes);
	if (mode == 'files')
	{
		if ( mandreelAppStartStateFunc )
			mandreelAppStartStateFunc("loadingData",percentage);
	}
	else if (mode == 'audio')
	{
		if ( mandreelAppStartStateFunc )
			mandreelAppStartStateFunc("loadingAudioUpdate",percentage);
	}
	else if (mode == 'textureasync')
	{
		if ( mandreelAppStartStateFunc )
			mandreelAppStartStateFunc("loadingTextureAsyncPack",percentage);
	}

}