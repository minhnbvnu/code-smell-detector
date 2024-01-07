function abs_(x) {
	  var $x = convertToTensor(x, 'x', 'abs');

	  if ($x.dtype === 'complex64') {
	    var inputs = {
	      x: $x
	    };
	    return ENGINE.runKernel(ComplexAbs, inputs);
	  } else {
	    var _inputs = {
	      x: $x
	    };
	    return ENGINE.runKernel(Abs, _inputs);
	  }
	}