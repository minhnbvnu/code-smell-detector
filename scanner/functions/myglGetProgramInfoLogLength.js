function myglGetProgramInfoLogLength(sp)
{
	var program_id = heap32[sp>>2];sp+=4;

	var info_log = imandreel_gl.getProgramInfoLog(array_ids_ogl[program_id]);

	if (info_log)
		r_g0 = info_log.length+1;
	else
		r_g0 = 0;
}