function myglTexSubImage2D(sp)
 {
  var target = heap32[sp>>2];sp+=4;
  var level = heap32[sp>>2];sp+=4;
  var xoffset = heap32[sp>>2];sp+=4;
  var yoffset = heap32[sp>>2];sp+=4;
  var width = heap32[sp>>2];sp+=4;
  var height = heap32[sp>>2];sp+=4;
  var format = heap32[sp>>2];sp+=4;
  var type = heap32[sp>>2];sp+=4;
  var data = heap32[sp>>2];sp+=4;



  	var bufferView;
   if (type == imandreel_gl.UNSIGNED_SHORT_5_6_5 || type == imandreel_gl.UNSIGNED_SHORT_4_4_4_4 || type == imandreel_gl.UNSIGNED_SHORT_5_5_5_1)
   {
		bufferView = new Uint16Array(heap,data,width*height);
	}
	else if (type == imandreel_gl.UNSIGNED_BYTE)
	{
		if (format == imandreel_gl.LUMINANCE)
			bufferView = new Uint8Array(heap,data,width*height);
		else if (format == imandreel_gl.RGB)
			bufferView = new Uint8Array(heap,data,width*height*3);
		else if (format == imandreel_gl.RGBA)
			bufferView = new Uint8Array(heap,data,width*height*4);
		else if (format == imandreel_gl.ALPHA)
			bufferView = new Uint8Array(heap,data,width*height);
	}

  imandreel_gl.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, bufferView);
 }