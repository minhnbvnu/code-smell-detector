function downloadPackedMatrixFromBuffer(gl, buffer, batch, rows, cols, physicalRows, physicalCols, textureConfig) {
	  var gl2 = gl;
	  var downloadTarget = new Float32Array(getPackedRGBAArraySizeFromMatrixShape(physicalRows, physicalCols));
	  gl2.bindBuffer(gl2.PIXEL_PACK_BUFFER, buffer);
	  gl2.getBufferSubData(gl2.PIXEL_PACK_BUFFER, 0, downloadTarget);
	  gl2.bindBuffer(gl2.PIXEL_PACK_BUFFER, null);
	  return downloadTarget;
	}