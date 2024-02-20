function mygetProgramParameter(sp)
 {
 	var program_id = heap32[sp>>2];sp+=4;
	var pname = heap32[sp>>2];sp+=4;
	r_g0 = imandreel_gl.getProgramParameter(array_ids_ogl[program_id], pname);
 }