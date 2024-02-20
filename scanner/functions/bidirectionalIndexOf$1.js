function bidirectionalIndexOf$1(buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1; // Normalize byteOffset

	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset;
	    byteOffset = 0;
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff;
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000;
	  }

	  byteOffset = +byteOffset; // Coerce to Number.

	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : buffer.length - 1;
	  } // Normalize byteOffset: negative offsets start from the end of the buffer


	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;

	  if (byteOffset >= buffer.length) {
	    if (dir) return -1;else byteOffset = buffer.length - 1;
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0;else return -1;
	  } // Normalize val


	  if (typeof val === 'string') {
	    val = Buffer$1.from(val, encoding);
	  } // Finally, search either indexOf (if dir is true) or lastIndexOf


	  if (internalIsBuffer$1(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1;
	    }

	    return arrayIndexOf$1(buffer, val, byteOffset, encoding, dir);
	  } else if (typeof val === 'number') {
	    val = val & 0xFF; // Search for a byte value [0-255]

	    if (Buffer$1.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
	      }
	    }

	    return arrayIndexOf$1(buffer, [val], byteOffset, encoding, dir);
	  }

	  throw new TypeError('val must be string, number or Buffer');
	}