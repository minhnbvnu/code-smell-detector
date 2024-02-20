function myglCreateShader(sp)
{
	var type = heap32[sp>>2];sp+=4;
	var id = myglNewSlot();

	array_ids_ogl[id] = imandreel_gl.createShader(type);

	r_g0 = id;
}