function myglEnable(sp)
 {
	var value = heap32[sp>>2];sp+=4;

	imandreel_gl.enable(value);
  }