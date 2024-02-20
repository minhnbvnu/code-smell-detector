function myglPixelStorei (sp)
  {
	var pname = heap32[sp>>2];sp+=4;
	var param = heap32[sp>>2];sp+=4;
	imandreel_gl.pixelStorei(pname,param);
  }