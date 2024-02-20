function getSubstFormat(lookupTable, format, defaultSubtable) {
	    var subtables = lookupTable.subtables;
	    for (var i = 0; i < subtables.length; i++) {
	        var subtable = subtables[i];
	        if (subtable.substFormat === format) {
	            return subtable;
	        }
	    }
	    if (defaultSubtable) {
	        subtables.push(defaultSubtable);
	        return defaultSubtable;
	    }
	    return undefined;
	}