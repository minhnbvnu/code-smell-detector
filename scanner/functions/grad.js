function grad(f) {
	  assert(isFunction(f), function () {
	    return 'The f passed in grad(f) must be a function';
	  });
	  return function (x, dy) {
	    // x can be of any dtype, thus null as the last argument.
	    var $x = convertToTensor(x, 'x', 'tf.grad', 'string_or_numeric');
	    var $dy = dy != null ? convertToTensor(dy, 'dy', 'tf.grad') : null;
	    return ENGINE.tidy(function () {
	      var _ENGINE$gradients = ENGINE.gradients(function () {
	        return f($x);
	      }, [$x], $dy),
	          value = _ENGINE$gradients.value,
	          grads = _ENGINE$gradients.grads;

	      if ($dy != null) {
	        assertShapesMatch(value.shape, $dy.shape, 'The shape of dy passed in grad(f)(x, dy) must match the shape ' + 'returned by f(x)');
	      }

	      checkGrads(grads);
	      return grads[0];
	    });
	  };
	}