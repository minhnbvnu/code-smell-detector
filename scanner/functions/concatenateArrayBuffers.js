function concatenateArrayBuffers(buffers) {
	  if (buffers.length === 1) {
	    return buffers[0];
	  }

	  var totalByteLength = 0;
	  buffers.forEach(function (buffer) {
	    totalByteLength += buffer.byteLength;
	  });
	  var temp = new Uint8Array(totalByteLength);
	  var offset = 0;
	  buffers.forEach(function (buffer) {
	    temp.set(new Uint8Array(buffer), offset);
	    offset += buffer.byteLength;
	  });
	  return temp.buffer;
	}