function myglUniform3f(sp)
{
	var index = heap32[sp>>2];sp+=4;
	var x = heapFloat[sp>>2];sp+=4;
	var y = heapFloat[sp>>2];sp+=4;
	var z = heapFloat[sp>>2];sp+=4;

	var program = array_ids_ogl[g_current_program_id];

	var uniform_value = program.array_uniform_locations[index];

	imandreel_gl.uniform3f(uniform_value, x,y,z);
}