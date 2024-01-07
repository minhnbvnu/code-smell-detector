function logSigmoid_(x) {
	  var $x = convertToTensor(x, 'x', 'logSigmoid'); // Use a custom gradient to maintain previous implementation.
	  // There is no LogSigmoid kernel in TF so we can't use engine.runKernel
	  // directly

	  var customOp = customGrad(function (x) {
	    // TODO(yassogba) we can remove the chained softplus call here only
	    // after backends have modualrized softplus at which point we can call
	    // engine runKernel(..., Sotfplus, ...) directly.
	    var value = neg(softplus(neg(x)));

	    var gradFunc = function gradFunc(dy) {
	      var derX = mul(dy, sigmoid(neg(x)));
	      return derX;
	    };

	    return {
	      value: value,
	      gradFunc: gradFunc
	    };
	  });
	  return customOp($x);
	}