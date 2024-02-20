function parseWindowsKernTable(p) {
	    var pairs = {};
	    // Skip nTables.
	    p.skip('uShort');
	    var subtableVersion = p.parseUShort();
	    check.argument(subtableVersion === 0, 'Unsupported kern sub-table version.');
	    // Skip subtableLength, subtableCoverage
	    p.skip('uShort', 2);
	    var nPairs = p.parseUShort();
	    // Skip searchRange, entrySelector, rangeShift.
	    p.skip('uShort', 3);
	    for (var i = 0; i < nPairs; i += 1) {
	        var leftIndex = p.parseUShort();
	        var rightIndex = p.parseUShort();
	        var value = p.parseShort();
	        pairs[leftIndex + ',' + rightIndex] = value;
	    }
	    return pairs;
	}