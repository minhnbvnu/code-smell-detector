function localResponseNormalizationBackprop_(x, y, dy, depthRadius, bias, alpha, beta) {
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

	  var inputs = {
	    x: x,
	    y: y,
	    dy: dy
	  };
	  var attrs = {
	    depthRadius: depthRadius,
	    bias: bias,
	    alpha: alpha,
	    beta: beta
	  };
	  return ENGINE.runKernel(LRNGrad, inputs, attrs);
	}