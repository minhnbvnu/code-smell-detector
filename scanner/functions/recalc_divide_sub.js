function recalc_divide_sub(gfc, cod_info2, gi, ix, r01_bits, r01_div, r0_tbl, r1_tbl) {
	        var bigv = cod_info2.big_values;

	        for (var r2 = 2; r2 < Encoder.SBMAX_l + 1; r2++) {
	            var a2 = gfc.scalefac_band.l[r2];
	            if (a2 >= bigv)
	                break;
	            var bits = r01_bits[r2 - 2] + cod_info2.count1bits;
	            if (gi.part2_3_length <= bits)
	                break;

	            var bi = new Bits(bits);
	            var r2t = choose_table(ix, a2, bigv, bi);
	            bits = bi.bits;
	            if (gi.part2_3_length <= bits)
	                continue;

	            gi.assign(cod_info2);
	            gi.part2_3_length = bits;
	            gi.region0_count = r01_div[r2 - 2];
	            gi.region1_count = r2 - 2 - r01_div[r2 - 2];
	            gi.table_select[0] = r0_tbl[r2 - 2];
	            gi.table_select[1] = r1_tbl[r2 - 2];
	            gi.table_select[2] = r2t;
	        }
	    }