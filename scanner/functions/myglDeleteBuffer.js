function myglDeleteBuffer (sp)
 {

	var buffer_id = heap32[sp>>2];sp+=4;

	var buffer = array_ids_ogl[buffer_id];

	imandreel_gl.deleteBuffer(buffer);

	array_ids_ogl[buffer_id] = null;

	myglFreeSlot(buffer_id);
 }