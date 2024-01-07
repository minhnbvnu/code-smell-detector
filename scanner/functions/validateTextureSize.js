function validateTextureSize(width, height) {
	  var maxTextureSize = env().getNumber('WEBGL_MAX_TEXTURE_SIZE');

	  if (width <= 0 || height <= 0) {
	    var requested = "[" + width + "x" + height + "]";
	    throw new Error('Requested texture size ' + requested + ' is invalid.');
	  }

	  if (width > maxTextureSize || height > maxTextureSize) {
	    var _requested = "[" + width + "x" + height + "]";

	    var max = "[" + maxTextureSize + "x" + maxTextureSize + "]";
	    throw new Error('Requested texture size ' + _requested + ' greater than WebGL maximum on this browser / GPU ' + max + '.');
	  }
	}