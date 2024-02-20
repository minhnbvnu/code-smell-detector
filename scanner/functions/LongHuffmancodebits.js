function LongHuffmancodebits(gfc, gi) {
	        var bigvalues, bits;
	        var region1Start, region2Start;

	        bigvalues = gi.big_values;

	        var i = gi.region0_count + 1;
	        region1Start = gfc.scalefac_band.l[i];
	        i += gi.region1_count + 1;
	        region2Start = gfc.scalefac_band.l[i];

	        if (region1Start > bigvalues)
	            region1Start = bigvalues;

	        if (region2Start > bigvalues)
	            region2Start = bigvalues;

	        bits = Huffmancode(gfc, gi.table_select[0], 0, region1Start, gi);
	        bits += Huffmancode(gfc, gi.table_select[1], region1Start,
	            region2Start, gi);
	        bits += Huffmancode(gfc, gi.table_select[2], region2Start, bigvalues,
	            gi);
	        return bits;
	    }