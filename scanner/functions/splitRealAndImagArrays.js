function splitRealAndImagArrays(complex) {
	  var real = new Float32Array(complex.length / 2);
	  var imag = new Float32Array(complex.length / 2);

	  for (var i = 0; i < complex.length; i += 2) {
	    real[i / 2] = complex[i];
	    imag[i / 2] = complex[i + 1];
	  }

	  return {
	    real: real,
	    imag: imag
	  };
	}