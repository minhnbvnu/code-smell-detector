function parseMacKernTable(p) {
	    var pairs = {};
	    // The Mac kern table stores the version as a fixed (32 bits) but we only loaded the first 16 bits.
	    // Skip the rest.
	    p.skip('uShort');
	    var nTables = p.parseULong();
	    //check.argument(nTables === 1, 'Only 1 subtable is supported (got ' + nTables + ').');
	    if (nTables > 1) {
	        console.warn('Only the first kern subtable is supported.');
	    }
	    p.skip('uLong');
	    var coverage = p.parseUShort();
	    var subtableVersion = coverage & 0xFF;
	    p.skip('uShort');
	    if (subtableVersion === 0) {
	        var nPairs = p.parseUShort();
	        // Skip searchRange, entrySelector, rangeShift.
	        p.skip('uShort', 3);
	        for (var i = 0; i < nPairs; i += 1) {
	            var leftIndex = p.parseUShort();
	            var rightIndex = p.parseUShort();
	            var value = p.parseShort();
	            pairs[leftIndex + ',' + rightIndex] = value;
	        }
	    }
	    return pairs;
	}