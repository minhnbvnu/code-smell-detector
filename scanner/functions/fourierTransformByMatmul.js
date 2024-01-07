function fourierTransformByMatmul(data, size, inverse) {
	  var ret = new Float32Array(size * 2); // TODO: Use matmul instead once it supports complex64 type.

	  for (var r = 0; r < size; r++) {
	    var _real2 = 0.0;
	    var _imag2 = 0.0;

	    for (var c = 0; c < size; c++) {
	      var e = exponent(r * c, size, inverse);
	      var term = getComplexWithIndex(data, c);
	      _real2 += term.real * e.real - term.imag * e.imag;
	      _imag2 += term.real * e.imag + term.imag * e.real;
	    }

	    if (inverse) {
	      _real2 /= size;
	      _imag2 /= size;
	    }

	    assignToTypedArray(ret, _real2, _imag2, r);
	  }

	  return ret;
	}