function arrayish2Buffer(arr) {
	    if (arr instanceof Buffer) {
	        return arr;
	    }
	    else if (arr instanceof Uint8Array) {
	        return uint8Array2Buffer(arr);
	    }
	    else {
	        return Buffer.from(arr);
	    }
	}