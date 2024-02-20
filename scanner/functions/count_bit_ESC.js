function count_bit_ESC(ix, ixPos, end, t1, t2, s) {
	        /* ESC-table is used */
	        var linbits = Tables.ht[t1].xlen * 65536 + Tables.ht[t2].xlen;
	        var sum = 0, sum2;

	        do {
	            var x = ix[ixPos++];
	            var y = ix[ixPos++];

	            if (x != 0) {
	                if (x > 14) {
	                    x = 15;
	                    sum += linbits;
	                }
	                x *= 16;
	            }

	            if (y != 0) {
	                if (y > 14) {
	                    y = 15;
	                    sum += linbits;
	                }
	                x += y;
	            }

	            sum += Tables.largetbl[x];
	        } while (ixPos < end);

	        sum2 = sum & 0xffff;
	        sum >>= 16;

	        if (sum > sum2) {
	            sum = sum2;
	            t1 = t2;
	        }

	        s.bits += sum;
	        return t1;
	    }