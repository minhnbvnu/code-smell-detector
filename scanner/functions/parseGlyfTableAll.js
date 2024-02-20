function parseGlyfTableAll(data, start, loca, font) {
	    var glyphs = new glyphset.GlyphSet(font);

	    // The last element of the loca table is invalid.
	    for (var i = 0; i < loca.length - 1; i += 1) {
	        var offset = loca[i];
	        var nextOffset = loca[i + 1];
	        if (offset !== nextOffset) {
	            glyphs.push(i, glyphset.ttfGlyphLoader(font, i, parseGlyph, data, start + offset, buildPath));
	        } else {
	            glyphs.push(i, glyphset.glyphLoader(font, i));
	        }
	    }

	    return glyphs;
	}