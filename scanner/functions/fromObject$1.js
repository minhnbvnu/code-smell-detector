function fromObject$1(that, obj) {
	  if (internalIsBuffer$1(obj)) {
	    var len = checked$1(obj.length) | 0;
	    that = createBuffer$1(that, len);

	    if (that.length === 0) {
	      return that;
	    }

	    obj.copy(that, 0, 0, len);
	    return that;
	  }

	  if (obj) {
	    if (typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan$1(obj.length)) {
	        return createBuffer$1(that, 0);
	      }

	      return fromArrayLike$1(that, obj);
	    }

	    if (obj.type === 'Buffer' && isArray$2(obj.data)) {
	      return fromArrayLike$1(that, obj.data);
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
	}