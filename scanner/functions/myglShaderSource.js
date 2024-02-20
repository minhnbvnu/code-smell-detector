function myglShaderSource(sp)
{
	var id = heap32[sp>>2];sp+=4;
	var ptr_string = heap32[sp>>2];sp+=4;

	var shader = array_ids_ogl[id];

	var shader_code = get_string_from_ptr(ptr_string);

	//dump(shader_code);


	imandreel_gl.shaderSource(shader, shader_code);
}