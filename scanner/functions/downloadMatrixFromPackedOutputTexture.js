function downloadMatrixFromPackedOutputTexture(gl, physicalRows, physicalCols) {
	  var packedRGBA = new Float32Array(physicalRows * physicalCols * 4);
	  callAndCheck(gl, function () {
	    return gl.readPixels(0, 0, physicalCols, physicalRows, gl.RGBA, gl.FLOAT, packedRGBA);
	  });
	  return packedRGBA;
	}