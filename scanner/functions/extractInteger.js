function extractInteger(buf, bufPos) {
	        var x = buf[bufPos + 0] & 0xff;
	        x <<= 8;
	        x |= buf[bufPos + 1] & 0xff;
	        x <<= 8;
	        x |= buf[bufPos + 2] & 0xff;
	        x <<= 8;
	        x |= buf[bufPos + 3] & 0xff;
	        return x;
	    }