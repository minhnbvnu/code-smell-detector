function choose_table(ix, ixPos, endPos, s) {
	        var max = ix_max(ix, ixPos, endPos);

	        switch (max) {
	            case 0:
	                return max;

	            case 1:
	                return count_bit_noESC(ix, ixPos, endPos, s);

	            case 2:
	            case 3:
	                return count_bit_noESC_from2(ix, ixPos, endPos,
	                    huf_tbl_noESC[max - 1], s);

	            case 4:
	            case 5:
	            case 6:
	            case 7:
	            case 8:
	            case 9:
	            case 10:
	            case 11:
	            case 12:
	            case 13:
	            case 14:
	            case 15:
	                return count_bit_noESC_from3(ix, ixPos, endPos,
	                    huf_tbl_noESC[max - 1], s);

	            default:
	                /* try tables with linbits */
	                if (max > QuantizePVT.IXMAX_VAL) {
	                    s.bits = QuantizePVT.LARGE_BITS;
	                    return -1;
	                }
	                max -= 15;
	                var choice2;
	                for (choice2 = 24; choice2 < 32; choice2++) {
	                    if (Tables.ht[choice2].linmax >= max) {
	                        break;
	                    }
	                }
	                var choice;
	                for (choice = choice2 - 8; choice < 24; choice++) {
	                    if (Tables.ht[choice].linmax >= max) {
	                        break;
	                    }
	                }
	                return count_bit_ESC(ix, ixPos, endPos, choice, choice2, s);
	        }
	    }