function myglTexParameterf (sp)
  {
	var target = heap32[sp>>2];sp+=4;
	var pname = heap32[sp>>2];sp+=4;
	var value = heapFloat[sp>>2];sp+=4;

	imandreel_gl.texParameterf(target,pname,value);
}