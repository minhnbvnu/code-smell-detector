function writeheader(gfc, val, j) {
	        var ptr = gfc.header[gfc.h_ptr].ptr;

	        while (j > 0) {
	            var k = Math.min(j, 8 - (ptr & 7));
	            j -= k;
	            /* >> 32 too large for 32 bit machines */

	            gfc.header[gfc.h_ptr].buf[ptr >> 3] |= ((val >> j)) << (8 - (ptr & 7) - k);
	            ptr += k;
	        }
	        gfc.header[gfc.h_ptr].ptr = ptr;
	    }