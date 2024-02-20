function myglUseProgram(sp)
{
	var program_id = heap32[sp>>2];sp+=4;

	g_current_program_id = program_id;

	imandreel_gl.useProgram(array_ids_ogl[program_id]);

}