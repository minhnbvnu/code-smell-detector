function Buffer$1(arg, encodingOrOffset, length) {
	  if (!Buffer$1.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer$1)) {
	    return new Buffer$1(arg, encodingOrOffset, length);
	  } // Common case.


	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error('If encoding is specified then the first argument must be a string');
	    }

	    return allocUnsafe$1(this, arg);
	  }

	  return from$1(this, arg, encodingOrOffset, length);
	}