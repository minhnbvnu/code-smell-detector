function grads(f) {
	  assert(isFunction(f), function () {
	    return 'The f passed in grads(f) must be a function';
	  });
	  return function (args, dy) {
	    assert(Array.isArray(args), function () {
	      return 'The args passed in grads(f)(args) must be an array ' + 'of `Tensor`s or `TensorLike`s';
	    }); // args can be of any dtype, thus null as the last argument.

	    var $args = convertToTensorArray(args, 'args', 'tf.grads', 'string_or_numeric');
	    var $dy = dy != null ? convertToTensor(dy, 'dy', 'tf.grads') : null;
	    return ENGINE.tidy(function () {
	      var _ENGINE$gradients2 = ENGINE.gradients(function () {
	        return f.apply(void 0, $args);
	      }, $args, $dy),
	          value = _ENGINE$gradients2.value,
	          grads = _ENGINE$gradients2.grads;

	      if ($dy != null) {
	        assertShapesMatch(value.shape, $dy.shape, 'The shape of dy passed in grads(f)([x1,...], dy) must ' + 'match the shape returned by f([x1,...])');
	      }

	      checkGrads(grads);
	      return grads;
	    });
	  };
	}