function parseWOFFTableEntries(data, numTables) {
	    var tableEntries = [];
	    var p = 44; // offset to the first table directory entry.
	    for (var i = 0; i < numTables; i += 1) {
	        var tag = parse.getTag(data, p);
	        var offset = parse.getULong(data, p + 4);
	        var compLength = parse.getULong(data, p + 8);
	        var origLength = parse.getULong(data, p + 12);
	        var compression = (void 0);
	        if (compLength < origLength) {
	            compression = 'WOFF';
	        } else {
	            compression = false;
	        }

	        tableEntries.push({tag: tag, offset: offset, compression: compression,
	            compressedLength: compLength, length: origLength});
	        p += 20;
	    }

	    return tableEntries;
	}