function myglActiveTexture(sp)
{
	var param = heapU32[sp>>2];sp+=4;
	imandreel_gl.activeTexture(param);
}