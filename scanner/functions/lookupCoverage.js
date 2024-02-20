function lookupCoverage(glyphIndex, coverage) {
	    if (!glyphIndex) { return -1; }
	    switch (coverage.format) {
	        case 1:
	            return coverage.glyphs.indexOf(glyphIndex);

	        case 2:
	            var ranges = coverage.ranges;
	            for (var i = 0; i < ranges.length; i++) {
	                var range = ranges[i];
	                if (glyphIndex >= range.start && glyphIndex <= range.end) {
	                    var offset = glyphIndex - range.start;
	                    return range.index + offset;
	                }
	            }
	            break;
	        default:
	            return -1; // not found
	    }
	    return -1;
	}