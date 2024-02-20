function MandreelInterSwfLoaded()
{
	appStartState('scriptLoaded');
	var flashMovie = swfobject.getObjectById(mandreelAppCanvasDiv)
	dump(flashMovie.width);
	flashMovie.MandreelInit();

	imandreel_flash_global_sp = MandreelInterGetSWF().MandreelInterGetGlobalStack();
	imandreel_flash_global_sp2 = MandreelInterGetSWF().MandreelInterGetGlobalStack2();
	if ( mandreelAppStartStateFunc )
		mandreelAppStartStateFunc("ready",mandreelAppCanvasWidth,mandreelAppCanvasHeight);
}