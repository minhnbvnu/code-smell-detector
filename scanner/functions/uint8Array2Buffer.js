function uint8Array2Buffer(u8) {
	    if (u8 instanceof Buffer) {
	        return u8;
	    }
	    else if (u8.byteOffset === 0 && u8.byteLength === u8.buffer.byteLength) {
	        return arrayBuffer2Buffer(u8.buffer);
	    }
	    else {
	        return Buffer.from(u8.buffer, u8.byteOffset, u8.byteLength);
	    }
	}