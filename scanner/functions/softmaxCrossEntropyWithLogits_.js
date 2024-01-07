function softmaxCrossEntropyWithLogits_(labels, logits, dim) {
	  if (dim === void 0) {
	    dim = -1;
	  }

	  if (dim === -1) {
	    dim = logits.rank - 1;
	  }

	  if (dim !== logits.rank - 1) {
	    throw Error("Softmax cross entropy along a non-last dimension is not yet " + ("supported. Labels / logits was rank " + logits.rank + " ") + ("and dim was " + dim));
	  } // Use a custom gradient for numerical stability.


	  var customOp = customGrad(function (labels, logits, save) {
	    // Reference:
	    //   1. http://cs231n.github.io/linear-classify/#softmax
	    //   2. https://blog.feedly.com/tricks-of-the-trade-logsumexp/
	    var keepDims = true;
	    var lse = logSumExp(logits, [dim], keepDims);
	    var logResult = sub(cast(logits, 'float32'), lse);
	    save([labels, logResult]);
	    var costVector = neg(mul(logResult, labels));
	    var value = sum$1(costVector, [dim]);

	    var gradFunc = function gradFunc(dy, saved) {
	      var labels = saved[0],
	          logResult = saved[1];
	      var dyShape = expandShapeToKeepDim(dy.shape, [dim]);
	      return [mul(reshape(dy, dyShape), sub(cast(labels, 'float32'), exp$3(logResult))), mul(reshape(dy, dyShape), sub(exp$3(logResult), cast(labels, 'float32')))];
	    };

	    return {
	      value: value,
	      gradFunc: gradFunc
	    };
	  });
	  return customOp(labels, logits);
	}