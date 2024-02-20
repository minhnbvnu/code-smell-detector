function myglDepthFunc(sp)
  {
	var func = heapU32[sp>>2];sp+=4;

	imandreel_gl.depthFunc(func);

  }