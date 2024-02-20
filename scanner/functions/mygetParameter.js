function mygetParameter(sp)
 {
	var pname = heap32[sp>>2];sp+=4;
	r_g0 = imandreel_gl.getParameter(pname);
 }