function chainingSubstitutionFormat3(contextParams, subtable) {
	    var lookupsCount = (
	        subtable.inputCoverage.length +
	        subtable.lookaheadCoverage.length +
	        subtable.backtrackCoverage.length
	    );
	    if (contextParams.context.length < lookupsCount) { return []; }
	    // INPUT LOOKUP //
	    var inputLookups = lookupCoverageList(
	        subtable.inputCoverage, contextParams
	    );
	    if (inputLookups === -1) { return []; }
	    // LOOKAHEAD LOOKUP //
	    var lookaheadOffset = subtable.inputCoverage.length - 1;
	    if (contextParams.lookahead.length < subtable.lookaheadCoverage.length) { return []; }
	    var lookaheadContext = contextParams.lookahead.slice(lookaheadOffset);
	    while (lookaheadContext.length && isTashkeelArabicChar(lookaheadContext[0].char)) {
	        lookaheadContext.shift();
	    }
	    var lookaheadParams = new ContextParams(lookaheadContext, 0);
	    var lookaheadLookups = lookupCoverageList(
	        subtable.lookaheadCoverage, lookaheadParams
	    );
	    // BACKTRACK LOOKUP //
	    var backtrackContext = [].concat(contextParams.backtrack);
	    backtrackContext.reverse();
	    while (backtrackContext.length && isTashkeelArabicChar(backtrackContext[0].char)) {
	        backtrackContext.shift();
	    }
	    if (backtrackContext.length < subtable.backtrackCoverage.length) { return []; }
	    var backtrackParams = new ContextParams(backtrackContext, 0);
	    var backtrackLookups = lookupCoverageList(
	        subtable.backtrackCoverage, backtrackParams
	    );
	    var contextRulesMatch = (
	        inputLookups.length === subtable.inputCoverage.length &&
	        lookaheadLookups.length === subtable.lookaheadCoverage.length &&
	        backtrackLookups.length === subtable.backtrackCoverage.length
	    );
	    var substitutions = [];
	    if (contextRulesMatch) {
	        for (var i = 0; i < subtable.lookupRecords.length; i++) {
	            var lookupRecord = subtable.lookupRecords[i];
	            var lookupListIndex = lookupRecord.lookupListIndex;
	            var lookupTable = this.getLookupByIndex(lookupListIndex);
	            for (var s = 0; s < lookupTable.subtables.length; s++) {
	                var subtable$1 = lookupTable.subtables[s];
	                var lookup = this.getLookupMethod(lookupTable, subtable$1);
	                var substitutionType = this.getSubstitutionType(lookupTable, subtable$1);
	                if (substitutionType === '12') {
	                    for (var n = 0; n < inputLookups.length; n++) {
	                        var glyphIndex = contextParams.get(n);
	                        var substitution = lookup(glyphIndex);
	                        if (substitution) { substitutions.push(substitution); }
	                    }
	                }
	            }
	        }
	    }
	    return substitutions;
	}