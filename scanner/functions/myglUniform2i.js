function myglUniform2i(sp)
{
	var index = heap32[sp>>2];sp+=4;
	var x = heap32[sp>>2];sp+=4;
	var y = heap32[sp>>2];sp+=4;

	var program = array_ids_ogl[g_current_program_id];

	var uniform_value = program.array_uniform_locations[index];

	imandreel_gl.uniform2i(uniform_value, x,y);
}