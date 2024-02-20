function MandreelInterGetSWF()
{
	if (g_mandreel_swf)
		return g_mandreel_swf;

	g_mandreel_swf = swfobject.getObjectById(mandreelAppCanvasDiv)
	return g_mandreel_swf;
}