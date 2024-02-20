function myglTexParameteri (sp)
  {
	var target = heap32[sp>>2];sp+=4;
	var pname = heap32[sp>>2];sp+=4;
	var value = heap32[sp>>2];sp+=4;

	imandreel_gl.texParameteri(target,pname,value);
}