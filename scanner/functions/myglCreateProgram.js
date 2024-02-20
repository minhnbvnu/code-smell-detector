function myglCreateProgram(sp)
{
	var id = myglNewSlot();
	var program = imandreel_gl.createProgram();

	program.uniform_locations_current_id = 0;
	program.array_uniform_locations = [];

	array_ids_ogl[id] = program;


	r_g0 = id;
}