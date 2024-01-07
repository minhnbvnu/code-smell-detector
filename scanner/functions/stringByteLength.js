function stringByteLength(str) {
	  if (useNodeBuffer) {
	    return Buffer.byteLength(str);
	  }

	  return new Blob([str]).size;
	}