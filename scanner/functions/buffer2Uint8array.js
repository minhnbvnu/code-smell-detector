function buffer2Uint8array(buff) {
	    if (buff instanceof Uint8Array) {
	        // BFS & Node v4.0 buffers *are* Uint8Arrays.
	        return buff;
	    }
	    else {
	        // Uint8Arrays can be constructed from arrayish numbers.
	        // At this point, we assume this isn't a BFS array.
	        return new Uint8Array(buff);
	    }
	}