function myglCreateBuffer(sp)
{
	var id = myglNewSlot();
	array_ids_ogl[id] = imandreel_gl.createBuffer();

	r_g0 = id;
}