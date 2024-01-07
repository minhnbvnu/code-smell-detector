function exponent(k, n, inverse) {
	  var x = (inverse ? 2 : -2) * Math.PI * (k / n);
	  var real = Math.cos(x);
	  var imag = Math.sin(x);
	  return {
	    real: real,
	    imag: imag
	  };
	}