function recalc_divide_init(gfc, cod_info, ix, r01_bits, r01_div, r0_tbl, r1_tbl) {
	        var bigv = cod_info.big_values;

	        for (var r0 = 0; r0 <= 7 + 15; r0++) {
	            r01_bits[r0] = QuantizePVT.LARGE_BITS;
	        }

	        for (var r0 = 0; r0 < 16; r0++) {
	            var a1 = gfc.scalefac_band.l[r0 + 1];
	            if (a1 >= bigv)
	                break;
	            var r0bits = 0;
	            var bi = new Bits(r0bits);
	            var r0t = choose_table(ix, 0, a1, bi);
	            r0bits = bi.bits;

	            for (var r1 = 0; r1 < 8; r1++) {
	                var a2 = gfc.scalefac_band.l[r0 + r1 + 2];
	                if (a2 >= bigv)
	                    break;
	                var bits = r0bits;
	                bi = new Bits(bits);
	                var r1t = choose_table(ix, a1, a2, bi);
	                bits = bi.bits;
	                if (r01_bits[r0 + r1] > bits) {
	                    r01_bits[r0 + r1] = bits;
	                    r01_div[r0 + r1] = r0;
	                    r0_tbl[r0 + r1] = r0t;
	                    r1_tbl[r0 + r1] = r1t;
	                }
	            }
	        }
	    }