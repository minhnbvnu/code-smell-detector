function exponents(n, inverse) {
	  var real = new Float32Array(n / 2);
	  var imag = new Float32Array(n / 2);

	  for (var i = 0; i < Math.ceil(n / 2); i++) {
	    var x = (inverse ? 2 : -2) * Math.PI * (i / n);
	    real[i] = Math.cos(x);
	    imag[i] = Math.sin(x);
	  }

	  return {
	    real: real,
	    imag: imag
	  };
	}