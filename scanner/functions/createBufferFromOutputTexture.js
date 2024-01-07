function createBufferFromOutputTexture(gl2, rows, columns, textureConfig) {
	  // Create and bind the buffer.
	  var buffer = gl2.createBuffer();
	  callAndCheck(gl2, function () {
	    return gl2.bindBuffer(gl2.PIXEL_PACK_BUFFER, buffer);
	  }); // Initialize the buffer to the size of the texture in bytes.

	  var bytesPerFloat = 4;
	  var valuesPerTexel = 4;
	  var bufferSizeBytes = bytesPerFloat * valuesPerTexel * rows * columns;
	  callAndCheck(gl2, function () {
	    return gl2.bufferData(gl2.PIXEL_PACK_BUFFER, bufferSizeBytes, gl2.STREAM_READ);
	  }); // Enqueue a command on the GPU command queue to copy of texture into the
	  // buffer.

	  callAndCheck(gl2, function () {
	    return gl2.readPixels(0, 0, columns, rows, gl2.RGBA, gl2.FLOAT, 0);
	  });
	  callAndCheck(gl2, function () {
	    return gl2.bindBuffer(gl2.PIXEL_PACK_BUFFER, null);
	  });
	  return buffer;
	}