function shiftInBitsValue(x, n, v) {
	        return 0xff & ((x << n) | (v & ~(-1 << n)));
	    }