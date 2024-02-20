function createBuffer$1(that, length) {
	  if (kMaxLength$1() < length) {
	    throw new RangeError('Invalid typed array length');
	  }

	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length);
	    that.__proto__ = Buffer$1.prototype;
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer$1(length);
	    }

	    that.length = length;
	  }

	  return that;
	}