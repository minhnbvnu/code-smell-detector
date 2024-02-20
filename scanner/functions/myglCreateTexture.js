function myglCreateTexture(sp)
{
	var id = myglNewSlot();
	array_ids_ogl[id] = imandreel_gl.createTexture();

	r_g0 = id;
}