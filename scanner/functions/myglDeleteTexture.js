function myglDeleteTexture (sp)
 {

	var texture_id = heap32[sp>>2];sp+=4;

	var texture = array_ids_ogl[texture_id];

	imandreel_gl.deleteTexture(texture);

	array_ids_ogl[texture_id] = null;

	myglFreeSlot(texture_id);
 }