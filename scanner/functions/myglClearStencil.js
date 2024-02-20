function myglClearStencil(sp)
{
	var stencil = heap32[sp>>2];sp+=4;
	imandreel_gl.clearStencil(stencil);
}