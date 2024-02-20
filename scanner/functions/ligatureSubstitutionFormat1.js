function ligatureSubstitutionFormat1(contextParams, subtable) {
	    // COVERAGE LOOKUP //
	    var glyphIndex = contextParams.current;
	    var ligSetIndex = lookupCoverage(glyphIndex, subtable.coverage);
	    if (ligSetIndex === -1) { return null; }
	    // COMPONENTS LOOKUP
	    // (!) note, components are ordered in the written direction.
	    var ligature;
	    var ligatureSet = subtable.ligatureSets[ligSetIndex];
	    for (var s = 0; s < ligatureSet.length; s++) {
	        ligature = ligatureSet[s];
	        for (var l = 0; l < ligature.components.length; l++) {
	            var lookaheadItem = contextParams.lookahead[l];
	            var component = ligature.components[l];
	            if (lookaheadItem !== component) { break; }
	            if (l === ligature.components.length - 1) { return ligature; }
	        }
	    }
	    return null;
	}