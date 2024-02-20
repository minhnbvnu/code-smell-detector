function myglUniform1i(sp)
{
	var index = heap32[sp>>2];sp+=4;
	var value = heap32[sp>>2];sp+=4;

	var program = array_ids_ogl[g_current_program_id];

	var uniform_value = program.array_uniform_locations[index];

	imandreel_gl.uniform1i(uniform_value, value);
}