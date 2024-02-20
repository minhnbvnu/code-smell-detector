function myglGetProgramInfoLog(sp)
{
	var program_id = heap32[sp>>2];sp+=4;
	var ptr_string = heap32[sp>>2];sp+=4;

	var info_log = imandreel_gl.getProgramInfoLog(array_ids_ogl[program_id]);

	fill_ptr_from_string(ptr_string, info_log);
}