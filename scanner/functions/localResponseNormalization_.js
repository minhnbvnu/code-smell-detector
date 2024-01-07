function localResponseNormalization_(x, depthRadius, bias, alpha, beta) {
	  if (depthRadius === void 0) {
	    depthRadius = 5;
	  }

	  if (bias === void 0) {
	    bias = 1;
	  }

	  if (alpha === void 0) {
	    alpha = 1;
	  }

	  if (beta === void 0) {
	    beta = 0.5;
	  }

	  var $x = convertToTensor(x, 'x', 'localResponseNormalization');
	  assert($x.rank === 4 || $x.rank === 3, function () {
	    return "Error in localResponseNormalization: x must be rank 3 or 4 but got\n               rank " + $x.rank + ".";
	  });
	  assert(isInt(depthRadius), function () {
	    return "Error in localResponseNormalization: depthRadius must be an " + ("integer but got depthRadius " + depthRadius + ".");
	  });
	  var x4D = $x;
	  var reshapedTo4D = false;

	  if ($x.rank === 3) {
	    reshapedTo4D = true;
	    x4D = reshape($x, [1, $x.shape[0], $x.shape[1], $x.shape[2]]);
	  }

	  var inputs = {
	    x: x4D
	  };
	  var attrs = {
	    depthRadius: depthRadius,
	    bias: bias,
	    alpha: alpha,
	    beta: beta
	  }; // tslint:disable-next-line: no-unnecessary-type-assertion

	  var res = ENGINE.runKernel(LRN, inputs, attrs);

	  if (reshapedTo4D) {
	    return reshape(res, [res.shape[1], res.shape[2], res.shape[3]]);
	  } else {
	    return res;
	  }
	}