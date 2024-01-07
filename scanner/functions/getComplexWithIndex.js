function getComplexWithIndex(complex, index) {
	  var real = complex[index * 2];
	  var imag = complex[index * 2 + 1];
	  return {
	    real: real,
	    imag: imag
	  };
	}