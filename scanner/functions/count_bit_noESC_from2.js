function count_bit_noESC_from2(ix, ixPos, end, t1, s) {
	        /* No ESC-words */
	        var sum = 0, sum2;
	        var xlen = Tables.ht[t1].xlen;
	        var hlen;
	        if (t1 == 2)
	            hlen = Tables.table23;
	        else
	            hlen = Tables.table56;

	        do {
	            var x = ix[ixPos + 0] * xlen + ix[ixPos + 1];
	            ixPos += 2;
	            sum += hlen[x];
	        } while (ixPos < end);

	        sum2 = sum & 0xffff;
	        sum >>= 16;

	        if (sum > sum2) {
	            sum = sum2;
	            t1++;
	        }

	        s.bits += sum;
	        return t1;
	    }