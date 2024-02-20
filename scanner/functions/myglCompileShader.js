function myglCompileShader(sp)
{
	var id = heap32[sp>>2];sp+=4;

	var shader = array_ids_ogl[id];

	imandreel_gl.compileShader(shader);
}