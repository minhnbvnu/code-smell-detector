function downloadFloat32MatrixFromBuffer(gl, buffer, size) {
	  var gl2 = gl;
	  var downloadTarget = new Float32Array(size);
	  gl2.bindBuffer(gl2.PIXEL_PACK_BUFFER, buffer);
	  gl2.getBufferSubData(gl2.PIXEL_PACK_BUFFER, 0, downloadTarget);
	  gl2.bindBuffer(gl2.PIXEL_PACK_BUFFER, null);
	  return downloadTarget;
	}