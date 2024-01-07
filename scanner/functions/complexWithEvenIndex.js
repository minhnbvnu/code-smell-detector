function complexWithEvenIndex(complex) {
	  var len = Math.ceil(complex.length / 4);
	  var real = new Float32Array(len);
	  var imag = new Float32Array(len);

	  for (var i = 0; i < complex.length; i += 4) {
	    real[Math.floor(i / 4)] = complex[i];
	    imag[Math.floor(i / 4)] = complex[i + 1];
	  }

	  return {
	    real: real,
	    imag: imag
	  };
	}