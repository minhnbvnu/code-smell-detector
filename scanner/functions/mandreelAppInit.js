function mandreelAppInit()
{
	if ( mandreelAppPlatform == "webgl" || mandreelAppPlatform == "canvas" )
	{
		global_init(g_stack_pointer+800*1024);

		//Mandreel_TextureAsync_PackBufferData[_mandreel_currentPackTexture] = mandreelBufferPackAsyncTexture;
		//mandreelBufferPackAsyncTexture = null;
		var sp = g_stack_pointer+800*1024;
		heapU32[sp>>2] = mandreelAppCanvasWidth;
		heapU32[(sp+4)>>2] = mandreelAppCanvasHeight;
		__mandreel_internal_SetResolution(sp);
		__mandreel_internal_init(g_stack_pointer+800*1024);
		__init(g_stack_pointer+800*1024);
	}
}