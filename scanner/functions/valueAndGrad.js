function valueAndGrad(f) {
	  assert(isFunction(f), function () {
	    return 'The f passed in valueAndGrad(f) must be a function';
	  });
	  return function (x, dy) {
	    assert(x instanceof Tensor, function () {
	      return 'The x passed in valueAndGrad(f)(x) must be a tensor';
	    });
	    assert(dy == null || dy instanceof Tensor, function () {
	      return 'The dy passed in valueAndGrad(f)(x, dy) must be a tensor';
	    });

	    var _ENGINE$gradients3 = ENGINE.gradients(function () {
	      return f(x);
	    }, [x], dy),
	        grads = _ENGINE$gradients3.grads,
	        value = _ENGINE$gradients3.value;

	    checkGrads(grads);
	    return {
	      grad: grads[0],
	      value: value
	    };
	  };
	}