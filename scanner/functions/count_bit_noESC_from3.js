function count_bit_noESC_from3(ix, ixPos, end, t1, s) {
	        /* No ESC-words */
	        var sum1 = 0;
	        var sum2 = 0;
	        var sum3 = 0;
	        var xlen = Tables.ht[t1].xlen;
	        var hlen1 = Tables.ht[t1].hlen;
	        var hlen2 = Tables.ht[t1 + 1].hlen;
	        var hlen3 = Tables.ht[t1 + 2].hlen;

	        do {
	            var x = ix[ixPos + 0] * xlen + ix[ixPos + 1];
	            ixPos += 2;
	            sum1 += hlen1[x];
	            sum2 += hlen2[x];
	            sum3 += hlen3[x];
	        } while (ixPos < end);
	        var t = t1;
	        if (sum1 > sum2) {
	            sum1 = sum2;
	            t++;
	        }
	        if (sum1 > sum3) {
	            sum1 = sum3;
	            t = t1 + 2;
	        }
	        s.bits += sum1;

	        return t;
	    }