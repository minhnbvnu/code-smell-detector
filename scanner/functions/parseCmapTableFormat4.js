function parseCmapTableFormat4(cmap, p, data, start, offset) {
	    // Length in bytes of the sub-tables.
	    cmap.length = p.parseUShort();
	    cmap.language = p.parseUShort();

	    // segCount is stored x 2.
	    var segCount;
	    cmap.segCount = segCount = p.parseUShort() >> 1;

	    // Skip searchRange, entrySelector, rangeShift.
	    p.skip('uShort', 3);

	    // The "unrolled" mapping from character codes to glyph indices.
	    cmap.glyphIndexMap = {};
	    var endCountParser = new parse.Parser(data, start + offset + 14);
	    var startCountParser = new parse.Parser(data, start + offset + 16 + segCount * 2);
	    var idDeltaParser = new parse.Parser(data, start + offset + 16 + segCount * 4);
	    var idRangeOffsetParser = new parse.Parser(data, start + offset + 16 + segCount * 6);
	    var glyphIndexOffset = start + offset + 16 + segCount * 8;
	    for (var i = 0; i < segCount - 1; i += 1) {
	        var glyphIndex = (void 0);
	        var endCount = endCountParser.parseUShort();
	        var startCount = startCountParser.parseUShort();
	        var idDelta = idDeltaParser.parseShort();
	        var idRangeOffset = idRangeOffsetParser.parseUShort();
	        for (var c = startCount; c <= endCount; c += 1) {
	            if (idRangeOffset !== 0) {
	                // The idRangeOffset is relative to the current position in the idRangeOffset array.
	                // Take the current offset in the idRangeOffset array.
	                glyphIndexOffset = (idRangeOffsetParser.offset + idRangeOffsetParser.relativeOffset - 2);

	                // Add the value of the idRangeOffset, which will move us into the glyphIndex array.
	                glyphIndexOffset += idRangeOffset;

	                // Then add the character index of the current segment, multiplied by 2 for USHORTs.
	                glyphIndexOffset += (c - startCount) * 2;
	                glyphIndex = parse.getUShort(data, glyphIndexOffset);
	                if (glyphIndex !== 0) {
	                    glyphIndex = (glyphIndex + idDelta) & 0xFFFF;
	                }
	            } else {
	                glyphIndex = (c + idDelta) & 0xFFFF;
	            }

	            cmap.glyphIndexMap[c] = glyphIndex;
	        }
	    }
	}