function encodeVarDeltaRunAsWords(deltas, offset, result) {
	    var runLength = 0;
	    var numDeltas = deltas.length;
	    var pos = offset;
	    while (pos < numDeltas && runLength < 64) {
	        var value = deltas[pos];

	        // Within a word-encoded run of deltas, it is easiest to start
	        // a new run (with a different encoding) whenever we encounter
	        // a zero value. For example, the sequence [0x6666, 0, 0x7777]
	        // needs 7 bytes when storing the zero inside the current run
	        // (42 66 66 00 00 77 77), and equally 7 bytes when starting a
	        // new run (40 66 66 80 40 77 77).
	        if (value === 0) {
	            break;
	        }

	        // Within a word-encoded run of deltas, a single value in the
	        // range (-128..127) should be encoded within the current run
	        // because it is more compact. For example, the sequence
	        // [0x6666, 2, 0x7777] becomes 7 bytes when storing the value
	        // literally (42 66 66 00 02 77 77), but 8 bytes when starting
	        // a new run (40 66 66 00 02 40 77 77).
	        if (isByteEncodable(value) && pos + 1 < numDeltas && isByteEncodable(deltas[pos + 1])) {
	            break;
	        }

	        ++pos;
	        ++runLength;
	    }
	    result.push(0x40 | (runLength - 1));
	    for (var i = offset; i < pos; ++i) {
	        var val = deltas[i];
	        result.push(((val + 0x10000) >> 8) & 0xff, (val + 0x100) & 0xff);
	    }
	    return pos;
	}