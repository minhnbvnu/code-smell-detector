function copyingSlice(buff, start, end) {
	    if ( start === void 0 ) start = 0;
	    if ( end === void 0 ) end = buff.length;
	
	    if (start < 0 || end < 0 || end > buff.length || start > end) {
	        throw new TypeError(("Invalid slice bounds on buffer of length " + (buff.length) + ": [" + start + ", " + end + "]"));
	    }
	    if (buff.length === 0) {
	        // Avoid s0 corner case in ArrayBuffer case.
	        return emptyBuffer();
	    }
	    else {
	        var u8 = buffer2Uint8array(buff), s0 = buff[0], newS0 = (s0 + 1) % 0xFF;
	        buff[0] = newS0;
	        if (u8[0] === newS0) {
	            // Same memory. Revert & copy.
	            u8[0] = s0;
	            return uint8Array2Buffer(u8.slice(start, end));
	        }
	        else {
	            // Revert.
	            buff[0] = s0;
	            return uint8Array2Buffer(u8.subarray(start, end));
	        }
	    }
	}