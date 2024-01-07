function fromPixels$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var pixels = inputs.pixels;
	  var numChannels = attrs.numChannels;
	  var isVideo = typeof HTMLVideoElement !== 'undefined' && pixels instanceof HTMLVideoElement;
	  var isImage = typeof HTMLImageElement !== 'undefined' && pixels instanceof HTMLImageElement;
	  var isImageBitmap = typeof ImageBitmap !== 'undefined' && pixels instanceof ImageBitmap;

	  var _ref = isVideo ? [pixels.videoWidth, pixels.videoHeight] : [pixels.width, pixels.height],
	      width = _ref[0],
	      height = _ref[1];

	  var texShape = [height, width];
	  var outShape = [height, width, numChannels];

	  if (isImage || isVideo || isImageBitmap) {
	    if (fromPixels2DContext$1 == null) {
	      fromPixels2DContext$1 = document.createElement('canvas').getContext('2d');
	    }

	    fromPixels2DContext$1.canvas.width = width;
	    fromPixels2DContext$1.canvas.height = height;
	    fromPixels2DContext$1.drawImage(pixels, 0, 0, width, height);
	    pixels = fromPixels2DContext$1.canvas;
	  }

	  var tempPixelHandle = backend.makeTensorInfo(texShape, 'int32'); // This is a byte texture with pixels.

	  backend.texData.get(tempPixelHandle.dataId).usage = TextureUsage.PIXELS;
	  backend.gpgpu.uploadPixelDataToTexture(backend.getTexture(tempPixelHandle.dataId), pixels);
	  var program = env().getBool('WEBGL_PACK') ? new FromPixelsPackedProgram(outShape) : new FromPixelsProgram(outShape);
	  var res = backend.runWebGLProgram(program, [tempPixelHandle], 'int32');
	  backend.disposeData(tempPixelHandle.dataId);
	  return res;
	}