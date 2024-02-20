function getCffIndexObject(i, offsets, data, start, conversionFn) {
	    var count = parse.getCard16(data, start);
	    var objectOffset = 0;
	    if (count !== 0) {
	        var offsetSize = parse.getByte(data, start + 2);
	        objectOffset = start + ((count + 1) * offsetSize) + 2;
	    }

	    var value = parse.getBytes(data, objectOffset + offsets[i], objectOffset + offsets[i + 1]);
	    if (conversionFn) {
	        value = conversionFn(value);
	    }
	    return value;
	}