function putbits_noheaders(gfc, val, j) {

	        while (j > 0) {
	            var k;
	            if (bufBitIdx == 0) {
	                bufBitIdx = 8;
	                bufByteIdx++;
	                buf[bufByteIdx] = 0;
	            }

	            k = Math.min(j, bufBitIdx);
	            j -= k;

	            bufBitIdx -= k;

	            /* 32 too large on 32 bit machines */

	            buf[bufByteIdx] |= ((val >> j) << bufBitIdx);
	            totbit += k;
	        }
	    }