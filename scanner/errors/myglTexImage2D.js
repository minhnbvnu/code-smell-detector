function myglTexImage2D(sp)
 {
  var target = heap32[sp>>2];sp+=4;
  var level = heap32[sp>>2];sp+=4;
  var internalFormat = heap32[sp>>2];sp+=4;
  var width = heap32[sp>>2];sp+=4;
  var height = heap32[sp>>2];sp+=4;
  var border = heap32[sp>>2];sp+=4;
  var format = heap32[sp>>2];sp+=4;
  var type = heap32[sp>>2];sp+=4;
  var data = heap32[sp>>2];sp+=4;

  if (level>0 && target==imandreel_gl.TEXTURE_2D)
	return;

   if (data == 0)
  {
	//imandreel_gl.texImage2D(target, level, internalFormat, width, height, border, format, type, null);
	var buffer;
	var bufferView;

	if (type == imandreel_gl.UNSIGNED_SHORT_5_6_5 || type == imandreel_gl.UNSIGNED_SHORT_4_4_4_4 || type == imandreel_gl.UNSIGNED_SHORT_5_5_5_1)
    {
		buffer = new ArrayBuffer(width*height*2);
		bufferView = new Uint16Array(buffer);
	}
	else
	{
		var size;
		if (format == imandreel_gl.LUMINANCE)
			size = width*height;
		else if (format == imandreel_gl.RGB)
			size = width*height*3;
		else if (format == imandreel_gl.RGBA)
			size = width*height*4;
		else if (format == imandreel_gl.ALPHA)
			size = width*height;
		else if (format == imandreel_gl.LUMINANCE_ALPHA)
			size = width*height*2;

		buffer = new ArrayBuffer(size);
		bufferView = new Uint8Array(buffer);
	}

	imandreel_gl.texImage2D(target, level, internalFormat, width, height, border, format, type, bufferView);
	return;
  }


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
		else if (format == imandreel_gl.LUMINANCE_ALPHA)
			bufferView = new Uint8Array(heap,data,width*height*2);
		else
		{
			dump('format unknown ' + format + '\n');
			assert(false);
		}
	}
	else
	{
	dump('type unknown ' + type + '\n');
		assert(false);
	}

  imandreel_gl.texImage2D(target, level, internalFormat, width, height, border, format, type, bufferView);
  if ((width&(width-1))==0 && (height&(height-1))==0)
  {
    if (target==imandreel_gl.TEXTURE_2D)
	imandreel_gl.generateMipmap(target);
}
 }