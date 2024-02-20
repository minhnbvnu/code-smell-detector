function buffer2ArrayBuffer(buff) {
	    var u8 = buffer2Uint8array(buff), u8offset = u8.byteOffset, u8Len = u8.byteLength;
	    if (u8offset === 0 && u8Len === u8.buffer.byteLength) {
	        return u8.buffer;
	    }
	    else {
	        return u8.buffer.slice(u8offset, u8offset + u8Len);
	    }
	}