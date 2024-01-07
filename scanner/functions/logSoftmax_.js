function logSoftmax_(logits, axis) {
	  if (axis === void 0) {
	    axis = -1;
	  }

	  var $logits = convertToTensor(logits, 'logits', 'logSoftmax');

	  if (axis === -1) {
	    axis = $logits.rank - 1;
	  }

	  if (axis !== $logits.rank - 1) {
	    throw Error('Log Softmax along a non-last dimension is not yet supported. ' + ("Logits was rank " + $logits.rank + " and axis was " + axis));
	  } // const forward: ForwardFunc<Tensor> = (backend, save) => {
	  //   const keepDims = true;
	  //   const xMax = max(logits, axis, true);
	  //   const shifted = sub(logits, xMax);
	  //   const value =
	  //       sub(cast(shifted, 'float32'), log(sum(exp(shifted), axis,
	  //       keepDims)));
	  //   save([value]);
	  //   return value;
	  // };
	  // Use a custom gradient for numerical stability.


	  var customOp = customGrad(function (logits, save) {
	    var keepDims = true;
	    var xMax = max$4(logits, axis, true);
	    var shifted = sub(logits, xMax);
	    var value = sub(cast(shifted, 'float32'), log$9(sum$1(exp$3(shifted), axis, keepDims)));
	    save([value]);

	    var gradFunc = function gradFunc(dy, saved) {
	      var value = saved[0];
	      var keepDims = true;
	      var softmax = exp$3(value);
	      return sub(dy, mul(sum$1(dy, axis, keepDims), softmax));
	    };

	    return {
	      value: value,
	      gradFunc: gradFunc
	    };
	  });
	  return customOp($logits); // TODO Use Engine.runKernel when CPU/WebGL/WASM backends implement this.
	  // const inputs: LogSoftmaxInputs = {logits: $logits};
	  // const attrs: LogSoftmaxAttrs = {axis};
	  // return ENGINE.runKernel(
	  //            LogSoftmax, inputs as {} as NamedTensorMap,
	  //            attrs as {} as NamedAttrMap);
	}