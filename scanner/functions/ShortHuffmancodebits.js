function ShortHuffmancodebits(gfc, gi) {
	        var region1Start = 3 * gfc.scalefac_band.s[3];
	        if (region1Start > gi.big_values)
	            region1Start = gi.big_values;

	        /* short blocks do not have a region2 */
	        var bits = Huffmancode(gfc, gi.table_select[0], 0, region1Start, gi);
	        bits += Huffmancode(gfc, gi.table_select[1], region1Start,
	            gi.big_values, gi);
	        return bits;
	    }