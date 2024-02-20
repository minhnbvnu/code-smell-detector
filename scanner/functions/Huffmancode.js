function Huffmancode(gfc, tableindex, start, end, gi) {
	        var h = Tables.ht[tableindex];
	        var bits = 0;

	        if (0 == tableindex)
	            return bits;

	        for (var i = start; i < end; i += 2) {
	            var cbits = 0;
	            var xbits = 0;
	            var linbits = h.xlen;
	            var xlen = h.xlen;
	            var ext = 0;
	            var x1 = gi.l3_enc[i];
	            var x2 = gi.l3_enc[i + 1];

	            if (x1 != 0) {
	                if (gi.xr[i] < 0)
	                    ext++;
	                cbits--;
	            }

	            if (tableindex > 15) {
	                /* use ESC-words */
	                if (x1 > 14) {
	                    var linbits_x1 = x1 - 15;
	                    ext |= linbits_x1 << 1;
	                    xbits = linbits;
	                    x1 = 15;
	                }

	                if (x2 > 14) {
	                    var linbits_x2 = x2 - 15;
	                    ext <<= linbits;
	                    ext |= linbits_x2;
	                    xbits += linbits;
	                    x2 = 15;
	                }
	                xlen = 16;
	            }

	            if (x2 != 0) {
	                ext <<= 1;
	                if (gi.xr[i + 1] < 0)
	                    ext++;
	                cbits--;
	            }


	            x1 = x1 * xlen + x2;
	            xbits -= cbits;
	            cbits += h.hlen[x1];


	            putbits2(gfc, h.table[x1], cbits);
	            putbits2(gfc, ext, xbits);
	            bits += cbits + xbits;
	        }
	        return bits;
	    }