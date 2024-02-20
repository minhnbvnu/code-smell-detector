function count_bit_noESC(ix, ixPos, end, s) {
	        /* No ESC-words */
	        var sum1 = 0;
	        var hlen1 = Tables.ht[1].hlen;

	        do {
	            var x = ix[ixPos + 0] * 2 + ix[ixPos + 1];
	            ixPos += 2;
	            sum1 += hlen1[x];
	        } while (ixPos < end);

	        s.bits += sum1;
	        return 1;
	    }