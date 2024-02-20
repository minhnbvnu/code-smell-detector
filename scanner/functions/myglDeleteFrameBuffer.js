function myglDeleteFrameBuffer (sp)
 {
	var framebuffer_id = heap32[sp>>2];sp+=4;

	var framebuffer = array_ids_ogl[framebuffer_id];

	imandreel_gl.deleteFramebuffer(framebuffer);

	array_ids_ogl[framebuffer_id] = null;

	myglFreeSlot(framebuffer_id);
 }