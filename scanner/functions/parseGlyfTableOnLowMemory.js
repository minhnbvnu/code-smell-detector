function parseGlyfTableOnLowMemory(data, start, loca, font) {
	    var glyphs = new glyphset.GlyphSet(font);

	    font._push = function(i) {
	        var offset = loca[i];
	        var nextOffset = loca[i + 1];
	        if (offset !== nextOffset) {
	            glyphs.push(i, glyphset.ttfGlyphLoader(font, i, parseGlyph, data, start + offset, buildPath));
	        } else {
	            glyphs.push(i, glyphset.glyphLoader(font, i));
	        }
	    };

	    return glyphs;
	}