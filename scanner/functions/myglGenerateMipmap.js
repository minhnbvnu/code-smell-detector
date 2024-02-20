function myglGenerateMipmap(sp)
  {
	var texture_type = heap32[sp>>2];sp+=4;
	imandreel_gl.generateMipmap(texture_type);
  }