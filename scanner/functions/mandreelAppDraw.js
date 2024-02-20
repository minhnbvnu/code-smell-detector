function mandreelAppDraw(elapsed)
{
	if ( mandreelAppPlatform == "webgl" || mandreelAppPlatform == "canvas" )
	{
		if ( mandreelAppPlatform == "canvas" && imandreel_ctx_canvas != null )
		{
			var canvas = Mandreel_document.getElementById(mandreelAppCanvasName);
			imandreel_ctx_canvas.clearRect(0,0,canvas.width,canvas.height);
		}
		var sp = g_stack_pointer+800*1024;
		__mandreel_internal_preupdate(sp);
		heapU32[sp>>2] = elapsed;
		__draw(sp);
		__mandreel_internal_update(sp);
		__mandreel_process_async_calls();
	}
}