function fromPixels_(pixels, numChannels) {
	  if (numChannels === void 0) {
	    numChannels = 3;
	  }

	  // Sanity checks.
	  if (numChannels > 4) {
	    throw new Error('Cannot construct Tensor with more than 4 channels from pixels.');
	  }

	  if (pixels == null) {
	    throw new Error('pixels passed to tf.browser.fromPixels() can not be null');
	  }

	  var isPixelData = false;
	  var isImageData = false;
	  var isVideo = false;
	  var isImage = false;
	  var isCanvasLike = false;
	  var isImageBitmap = false;

	  if (pixels.data instanceof Uint8Array) {
	    isPixelData = true;
	  } else if (typeof ImageData !== 'undefined' && pixels instanceof ImageData) {
	    isImageData = true;
	  } else if (typeof HTMLVideoElement !== 'undefined' && pixels instanceof HTMLVideoElement) {
	    isVideo = true;
	  } else if (typeof HTMLImageElement !== 'undefined' && pixels instanceof HTMLImageElement) {
	    isImage = true; // tslint:disable-next-line: no-any
	  } else if (pixels.getContext != null) {
	    isCanvasLike = true;
	  } else if (typeof ImageBitmap !== 'undefined' && pixels instanceof ImageBitmap) {
	    isImageBitmap = true;
	  } else {
	    throw new Error('pixels passed to tf.browser.fromPixels() must be either an ' + "HTMLVideoElement, HTMLImageElement, HTMLCanvasElement, ImageData " + "in browser, or OffscreenCanvas, ImageData in webworker" + " or {data: Uint32Array, width: number, height: number}, " + ("but was " + pixels.constructor.name));
	  }

	  if (isVideo) {
	    var HAVE_CURRENT_DATA_READY_STATE = 2;

	    if (isVideo && pixels.readyState < HAVE_CURRENT_DATA_READY_STATE) {
	      throw new Error('The video element has not loaded data yet. Please wait for ' + '`loadeddata` event on the <video> element.');
	    }
	  } // If the current backend has 'FromPixels' registered, it has a more
	  // efficient way of handling pixel uploads, so we call that.


	  var kernel = getKernel(FromPixels, ENGINE.backendName);

	  if (kernel != null) {
	    var inputs = {
	      pixels: pixels
	    };
	    var attrs = {
	      numChannels: numChannels
	    };
	    return ENGINE.runKernel(FromPixels, inputs, attrs);
	  }

	  var _ref = isVideo ? [pixels.videoWidth, pixels.videoHeight] : [pixels.width, pixels.height],
	      width = _ref[0],
	      height = _ref[1];

	  var vals;

	  if (isCanvasLike) {
	    vals = // tslint:disable-next-line:no-any
	    pixels.getContext('2d').getImageData(0, 0, width, height).data;
	  } else if (isImageData || isPixelData) {
	    vals = pixels.data;
	  } else if (isImage || isVideo || isImageBitmap) {
	    if (fromPixels2DContext == null) {
	      fromPixels2DContext = document.createElement('canvas').getContext('2d');
	    }

	    fromPixels2DContext.canvas.width = width;
	    fromPixels2DContext.canvas.height = height;
	    fromPixels2DContext.drawImage(pixels, 0, 0, width, height);
	    vals = fromPixels2DContext.getImageData(0, 0, width, height).data;
	  }

	  var values;

	  if (numChannels === 4) {
	    values = new Int32Array(vals);
	  } else {
	    var numPixels = width * height;
	    values = new Int32Array(numPixels * numChannels);

	    for (var i = 0; i < numPixels; i++) {
	      for (var channel = 0; channel < numChannels; ++channel) {
	        values[i * numChannels + channel] = vals[i * 4 + channel];
	      }
	    }
	  }

	  var outShape = [height, width, numChannels];
	  return tensor3d(values, outShape, 'int32');
	}