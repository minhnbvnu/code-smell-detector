function createShort(buf, bufPos, value) {
	        buf[bufPos + 0] = 0xff & ((value >> 8) & 0xff);
	        buf[bufPos + 1] = 0xff & (value & 0xff);
	    }