function myglDeleteProgram (sp)
 {
	var program_id = heap32[sp>>2];sp+=4;

	var program = array_ids_ogl[program_id];

	imandreel_gl.deleteProgram(program);

	array_ids_ogl[program_id] = null;

	myglFreeSlot(program_id);
 }