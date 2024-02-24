function myglUniform2fv(sp)
{
	myglCreateUniformArrays();

    var index = heap32[sp >> 2]; sp += 4;
    var count = heap32[sp >> 2]; sp += 4;
    var data = heap32[sp >> 2]; sp += 4;

	var new_data = data>>2;
	var new_count = count*2;
	var bufferView = uniformArrays2[count];

	for ( var i = 0 ; i < new_count ; ++i )
	{
		bufferView[i] = heapFloat[new_data+i];
	}


	var program = array_ids_ogl[g_current_program_id];
    var uniform_value = program.array_uniform_locations[index];
    imandreel_gl.uniform2fv(uniform_value, bufferView);
}