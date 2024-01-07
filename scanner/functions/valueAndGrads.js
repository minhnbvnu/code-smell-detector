function valueAndGrads(f) {
	  assert(isFunction(f), function () {
	    return 'The f passed in valueAndGrads(f) must be a function';
	  });
	  return function (args, dy) {
	    assert(Array.isArray(args) && args.every(function (arg) {
	      return arg instanceof Tensor;
	    }), function () {
	      return 'The args passed in valueAndGrads(f)(args) must be array of ' + 'tensors';
	    });
	    assert(dy == null || dy instanceof Tensor, function () {
	      return 'The dy passed in valueAndGrads(f)(args, dy) must be a tensor';
	    });
	    var res = ENGINE.gradients(function () {
	      return f.apply(void 0, args);
	    }, args, dy);

	    if (dy != null) {
	      assertShapesMatch(res.value.shape, dy.shape, 'The shape of dy passed in valueAndGrads(f)([x1,...], dy) must ' + 'match the shape returned by f([x1,...])');
	    }

	    checkGrads(res.grads);
	    return res;
	  };
	}