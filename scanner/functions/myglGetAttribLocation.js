function myglGetAttribLocation(sp)
{
	var program_id = heap32[sp>>2];sp+=4;
	var ptr_string = heap32[sp>>2];sp+=4;

	var string = get_string_from_ptr(ptr_string);
	var result = imandreel_gl.getAttribLocation(array_ids_ogl[program_id], string);

	r_g0 = result;
}