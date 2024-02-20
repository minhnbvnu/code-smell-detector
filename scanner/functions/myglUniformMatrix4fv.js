function myglUniformMatrix4fv(sp)
{
	myglCreateUniformArrays();

	var index = heap32[sp>>2];sp+=4;
	var count = heap32[sp>>2];sp+=4;
	var transpose = heap32[sp>>2];sp+=4;
	var ptr = heap32[sp>>2];sp+=4;

	var program = array_ids_ogl[g_current_program_id];
	var uniform_value = program.array_uniform_locations[index];

	//var buffer_data = new Float32Array(heap, ptr, count*16);
	for ( var i = 0 ; i < count*16 ; ++i )
	{
		uniformArrays4[count*4][i] = heapFloat[(ptr>>2)+i];
	}

	//imandreel_gl.uniformMatrix4fv(uniform_value, transpose, buffer_data);
	//imandreel_gl.uniformMatrix4fv(uniform_value, transpose, heapFloat.subarray(ptr/4,(ptr/4)+(count*16)));
	imandreel_gl.uniformMatrix4fv(uniform_value, transpose, uniformArrays4[count*4]);
}