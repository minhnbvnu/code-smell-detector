function createInteger(buf, bufPos, value) {
	        buf[bufPos + 0] = 0xff & ((value >> 24) & 0xff);
	        buf[bufPos + 1] = 0xff & ((value >> 16) & 0xff);
	        buf[bufPos + 2] = 0xff & ((value >> 8) & 0xff);
	        buf[bufPos + 3] = 0xff & (value & 0xff);
	    }