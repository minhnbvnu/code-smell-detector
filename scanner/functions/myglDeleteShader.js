function myglDeleteShader (sp)
 {
	var shader_id = heap32[sp>>2];sp+=4;

	var shader = array_ids_ogl[shader_id];

	imandreel_gl.deleteShader(shader);

	array_ids_ogl[shader_id] = null;

	myglFreeSlot(shader_id);
 }