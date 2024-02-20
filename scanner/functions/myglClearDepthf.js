function myglClearDepthf(sp)
{
	var depth = heapFloat[sp>>2];sp+=4;
	imandreel_gl.clearDepth(depth);
}