function mygetShaderParameter(sp)
 {
 	var shader_id = heap32[sp>>2];sp+=4;
	var pname = heap32[sp>>2];sp+=4;
	r_g0 = imandreel_gl.getShaderParameter(array_ids_ogl[shader_id], pname);
 }