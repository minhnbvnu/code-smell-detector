function addGlyphNamesAll(font) {
	    var glyph;
	    var glyphIndexMap = font.tables.cmap.glyphIndexMap;
	    var charCodes = Object.keys(glyphIndexMap);

	    for (var i = 0; i < charCodes.length; i += 1) {
	        var c = charCodes[i];
	        var glyphIndex = glyphIndexMap[c];
	        glyph = font.glyphs.get(glyphIndex);
	        glyph.addUnicode(parseInt(c));
	    }

	    for (var i$1 = 0; i$1 < font.glyphs.length; i$1 += 1) {
	        glyph = font.glyphs.get(i$1);
	        if (font.cffEncoding) {
	            if (font.isCIDFont) {
	                glyph.name = 'gid' + i$1;
	            } else {
	                glyph.name = font.cffEncoding.charset[i$1];
	            }
	        } else if (font.glyphNames.names) {
	            glyph.name = font.glyphNames.glyphIndexToName(i$1);
	        }
	    }
	}