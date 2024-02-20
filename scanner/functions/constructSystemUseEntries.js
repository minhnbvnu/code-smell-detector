function constructSystemUseEntries(data, i, len, isoData) {
	    // If the remaining allocated space following the last recorded System Use Entry in a System
	    // Use field or Continuation Area is less than four bytes long, it cannot contain a System
	    // Use Entry and shall be ignored
	    len = len - 4;
	    var entries = new Array();
	    while (i < len) {
	        var entry = constructSystemUseEntry(data, i);
	        var length = entry.length();
	        if (length === 0) {
	            // Invalid SU section; prevent infinite loop.
	            return entries;
	        }
	        i += length;
	        if (entry instanceof STEntry) {
	            // ST indicates the end of entries.
	            break;
	        }
	        if (entry instanceof CEEntry) {
	            entries = entries.concat(entry.getEntries(isoData));
	        }
	        else {
	            entries.push(entry);
	        }
	    }
	    return entries;
	}