function myglBindBuffer(sp)
{
	var target = heapU32[sp>>2]; sp+=4;
	var id = heapU32[sp>>2]; sp+=4;

	imandreel_gl.bindBuffer(target, array_ids_ogl[id]);
}