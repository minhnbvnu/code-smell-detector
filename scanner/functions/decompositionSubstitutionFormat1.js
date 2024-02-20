function decompositionSubstitutionFormat1(glyphIndex, subtable) {
	    var substituteIndex = lookupCoverage(glyphIndex, subtable.coverage);
	    if (substituteIndex === -1) { return null; }
	    return subtable.sequences[substituteIndex];
	}