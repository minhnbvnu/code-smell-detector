function putbits2(gfc, val, j) {

	        while (j > 0) {
	            var k;
	            if (bufBitIdx == 0) {
	                bufBitIdx = 8;
	                bufByteIdx++;
	                if (gfc.header[gfc.w_ptr].write_timing == totbit) {
	                    putheader_bits(gfc);
	                }
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