function myglValidateProgram(sp)
{
	var program_id = heap32[sp>>2];sp+=4;

	imandreel_gl.validateProgram(array_ids_ogl[program_id]);
}