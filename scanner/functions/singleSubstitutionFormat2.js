function singleSubstitutionFormat2(glyphIndex, subtable) {
	    var substituteIndex = lookupCoverage(glyphIndex, subtable.coverage);
	    if (substituteIndex === -1) { return null; }
	    return subtable.substitute[substituteIndex];
	}