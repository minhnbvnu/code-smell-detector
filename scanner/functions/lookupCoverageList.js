function lookupCoverageList(coverageList, contextParams) {
	    var lookupList = [];
	    for (var i = 0; i < coverageList.length; i++) {
	        var coverage = coverageList[i];
	        var glyphIndex = contextParams.current;
	        glyphIndex = Array.isArray(glyphIndex) ? glyphIndex[0] : glyphIndex;
	        var lookupIndex = lookupCoverage(glyphIndex, coverage);
	        if (lookupIndex !== -1) {
	            lookupList.push(lookupIndex);
	        }
	    }
	    if (lookupList.length !== coverageList.length) { return -1; }
	    return lookupList;
	}