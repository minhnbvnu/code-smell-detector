function myglPolygonOffset(sp)
{
	var factor = heapFloat[sp>>2]; sp+=4;
	var units = heapFloat[sp>>2]; sp+=4;
	imandreel_gl.polygonOffset(factor, units);
}