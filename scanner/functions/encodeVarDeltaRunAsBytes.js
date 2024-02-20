function encodeVarDeltaRunAsBytes(deltas, offset, result) {
	    var runLength = 0;
	    var numDeltas = deltas.length;
	    var pos = offset;
	    while (pos < numDeltas && runLength < 64) {
	        var value = deltas[pos];
	        if (!isByteEncodable(value)) {
	            break;
	        }

	        // Within a byte-encoded run of deltas, a single zero is best
	        // stored literally as 0x00 value. However, if we have two or
	        // more zeroes in a sequence, it is better to start a new run.
	        // Fore example, the sequence of deltas [15, 15, 0, 15, 15]
	        // becomes 6 bytes (04 0F 0F 00 0F 0F) when storing the zero
	        // within the current run, but 7 bytes (01 0F 0F 80 01 0F 0F)
	        // when starting a new run.
	        if (value === 0 && pos + 1 < numDeltas && deltas[pos + 1] === 0) {
	            break;
	        }

	        ++pos;
	        ++runLength;
	    }
	    result.push(runLength - 1);
	    for (var i = offset; i < pos; ++i) {
	        result.push((deltas[i] + 256) & 0xff);
	    }
	    return pos;
	}