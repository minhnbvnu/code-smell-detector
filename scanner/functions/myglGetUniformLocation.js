function myglGetUniformLocation(sp)
{
	var program_id = heap32[sp>>2];sp+=4;
	var ptr_string = heap32[sp>>2];sp+=4;

	var string = get_string_from_ptr(ptr_string);
	var program = array_ids_ogl[program_id];
	var result = imandreel_gl.getUniformLocation(program, string);

	if (result != null)
	{
		program.array_uniform_locations[program.uniform_locations_current_id] = result;
		r_g0 = program.uniform_locations_current_id;
		program.uniform_locations_current_id++;
	}
	else
		r_g0 = -1;
}