function myglBindAttribLocation(sp)
{
	var program_id = heap32[sp>>2];sp+=4;
	var index = heap32[sp>>2];sp+=4;
	var ptr_string = heap32[sp>>2];sp+=4;

	var string = get_string_from_ptr(ptr_string);

	imandreel_gl.bindAttribLocation(array_ids_ogl[program_id], index, string);
}