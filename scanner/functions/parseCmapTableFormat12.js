function parseCmapTableFormat12(cmap, p) {
	    //Skip reserved.
	    p.parseUShort();

	    // Length in bytes of the sub-tables.
	    cmap.length = p.parseULong();
	    cmap.language = p.parseULong();

	    var groupCount;
	    cmap.groupCount = groupCount = p.parseULong();
	    cmap.glyphIndexMap = {};

	    for (var i = 0; i < groupCount; i += 1) {
	        var startCharCode = p.parseULong();
	        var endCharCode = p.parseULong();
	        var startGlyphId = p.parseULong();

	        for (var c = startCharCode; c <= endCharCode; c += 1) {
	            cmap.glyphIndexMap[c] = startGlyphId;
	            startGlyphId++;
	        }
	    }
	}