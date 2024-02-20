function myglUniform1iv(sp)
{
	var index = heap32[sp>>2];sp+=4;
	var count = heap32[sp>>2];sp+=4;
	var data = heap32[sp>>2];sp+=4;

	var new_data = data>>2;
	var new_count = count;
	var bufferView = new Int32Array(new_count);

	for ( var i = 0 ; i < new_count ; ++i )
	{
		bufferView[i] = heap32[new_data+i];
	}

	var program = array_ids_ogl[g_current_program_id];
	var uniform_value = program.array_uniform_locations[index];
	imandreel_gl.uniform1iv(uniform_value, bufferView);
}