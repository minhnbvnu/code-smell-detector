function encodeVarDeltaRunAsZeroes(deltas, pos, result) {
	    var runLength = 0;
	    var numDeltas = deltas.length;
	    while (pos < numDeltas && runLength < 64 && deltas[pos] === 0) {
	        ++pos;
	        ++runLength;
	    }
	    result.push(0x80 | (runLength - 1));
	    return pos;
	}