function myglLinkProgram(sp)
{
	var program_id = heap32[sp>>2];sp+=4;

	imandreel_gl.linkProgram(array_ids_ogl[program_id]);
}