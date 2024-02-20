function myglBindFramebuffer(sp)
{
    var target = heap32[sp >> 2]; sp += 4;
    var framebuffer_id = heap32[sp >> 2]; sp += 4;

	if (framebuffer_id != 0)
	{
		var framebuffer = array_ids_ogl[framebuffer_id];
		imandreel_gl.bindFramebuffer(target,framebuffer);
	}
	else
		imandreel_gl.bindFramebuffer(target,null);

}