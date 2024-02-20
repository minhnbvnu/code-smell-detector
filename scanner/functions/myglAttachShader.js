function myglAttachShader(sp)
{
	var program_id = heap32[sp>>2];sp+=4;
	var shader_id = heap32[sp>>2];sp+=4;

	imandreel_gl.attachShader(array_ids_ogl[program_id], array_ids_ogl[shader_id]);
}