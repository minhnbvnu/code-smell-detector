function huffman_coder_count1(gfc, gi) {
	        /* Write count1 area */
	        var h = Tables.ht[gi.count1table_select + 32];
	        var i, bits = 0;

	        var ix = gi.big_values;
	        var xr = gi.big_values;

	        for (i = (gi.count1 - gi.big_values) / 4; i > 0; --i) {
	            var huffbits = 0;
	            var p = 0, v;

	            v = gi.l3_enc[ix + 0];
	            if (v != 0) {
	                p += 8;
	                if (gi.xr[xr + 0] < 0)
	                    huffbits++;
	            }

	            v = gi.l3_enc[ix + 1];
	            if (v != 0) {
	                p += 4;
	                huffbits *= 2;
	                if (gi.xr[xr + 1] < 0)
	                    huffbits++;
	            }

	            v = gi.l3_enc[ix + 2];
	            if (v != 0) {
	                p += 2;
	                huffbits *= 2;
	                if (gi.xr[xr + 2] < 0)
	                    huffbits++;
	            }

	            v = gi.l3_enc[ix + 3];
	            if (v != 0) {
	                p++;
	                huffbits *= 2;
	                if (gi.xr[xr + 3] < 0)
	                    huffbits++;
	            }

	            ix += 4;
	            xr += 4;
	            putbits2(gfc, huffbits + h.table[p], h.hlen[p]);
	            bits += h.hlen[p];
	        }
	        return bits;
	    }