function parseCFFIndexLowMemory(data, start) {
	    var offsets = [];
	    var count = parse.getCard16(data, start);
	    var objectOffset;
	    var endOffset;
	    if (count !== 0) {
	        var offsetSize = parse.getByte(data, start + 2);
	        objectOffset = start + ((count + 1) * offsetSize) + 2;
	        var pos = start + 3;
	        for (var i = 0; i < count + 1; i += 1) {
	            offsets.push(parse.getOffset(data, pos, offsetSize));
	            pos += offsetSize;
	        }

	        // The total size of the index array is 4 header bytes + the value of the last offset.
	        endOffset = objectOffset + offsets[count];
	    } else {
	        endOffset = start + 2;
	    }

	    return {offsets: offsets, startOffset: start, endOffset: endOffset};
	}