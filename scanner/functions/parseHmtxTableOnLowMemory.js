function parseHmtxTableOnLowMemory(font, data, start, numMetrics, numGlyphs) {
	    font._hmtxTableData = {};

	    var advanceWidth;
	    var leftSideBearing;
	    var p = new parse.Parser(data, start);
	    for (var i = 0; i < numGlyphs; i += 1) {
	        // If the font is monospaced, only one entry is needed. This last entry applies to all subsequent glyphs.
	        if (i < numMetrics) {
	            advanceWidth = p.parseUShort();
	            leftSideBearing = p.parseShort();
	        }

	        font._hmtxTableData[i] = {
	            advanceWidth: advanceWidth,
	            leftSideBearing: leftSideBearing
	        };
	    }
	}