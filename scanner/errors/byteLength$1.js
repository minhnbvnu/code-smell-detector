function byteLength$1(string, encoding) {
	  if (internalIsBuffer$1(string)) {
	    return string.length;
	  }

	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength;
	  }

	  if (typeof string !== 'string') {
	    string = '' + string;
	  }

	  var len = string.length;
	  if (len === 0) return 0; // Use a for loop to avoid recursion

	  var loweredCase = false;

	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len;

	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes$1(string).length;

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2;

	      case 'hex':
	        return len >>> 1;

	      case 'base64':
	        return base64ToBytes$1(string).length;

	      default:
	        if (loweredCase) return utf8ToBytes$1(string).length; // assume utf8

	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	}