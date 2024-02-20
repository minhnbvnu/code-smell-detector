function getFractionalBits(n) {
	            return ((n - (n | 0)) * 0x100000000) | 0;
	        }