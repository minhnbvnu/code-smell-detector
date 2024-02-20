function addGlyphNamesToUnicodeMap(font) {
	    font._IndexToUnicodeMap = {};

	    var glyphIndexMap = font.tables.cmap.glyphIndexMap;
	    var charCodes = Object.keys(glyphIndexMap);

	    for (var i = 0; i < charCodes.length; i += 1) {
	        var c = charCodes[i];
	        var glyphIndex = glyphIndexMap[c];
	        if (font._IndexToUnicodeMap[glyphIndex] === undefined) {
	            font._IndexToUnicodeMap[glyphIndex] = {
	                unicodes: [parseInt(c)]
	            };
	        } else {
	            font._IndexToUnicodeMap[glyphIndex].unicodes.push(parseInt(c));
	        }
	    }
	}