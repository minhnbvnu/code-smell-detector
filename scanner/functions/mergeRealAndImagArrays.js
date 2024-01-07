function mergeRealAndImagArrays(real, imag) {
	  if (real.length !== imag.length) {
	    throw new Error("Cannot merge real and imag arrays of different lengths. real:" + (real.length + ", imag: " + imag.length + "."));
	  }

	  var result = new Float32Array(real.length * 2);

	  for (var i = 0; i < result.length; i += 2) {
	    result[i] = real[i / 2];
	    result[i + 1] = imag[i / 2];
	  }

	  return result;
	}