function _fusedMatMul(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var a = inputs.a,
	      b = inputs.b,
	      bias = inputs.bias,
	      preluActivationWeights = inputs.preluActivationWeights;
	  var transposeA = attrs.transposeA,
	      transposeB = attrs.transposeB,
	      activation = attrs.activation,
	      leakyreluAlpha = attrs.leakyreluAlpha;
	  var current;
	  var addRes;
	  var activationRes;
	  var intermediates = [];
	  var matMulRes = batchMatMul({
	    inputs: {
	      a: a,
	      b: b
	    },
	    attrs: {
	      transposeA: transposeA,
	      transposeB: transposeB
	    },
	    backend: backend
	  });
	  current = matMulRes;

	  if (bias) {
	    addRes = add$4({
	      inputs: {
	        a: current,
	        b: bias
	      },
	      backend: backend
	    });
	    intermediates.push(current);
	    current = addRes;
	  }

	  if (activation) {
	    activationRes = applyActivation$1(backend, current, activation, preluActivationWeights, leakyreluAlpha);
	    intermediates.push(current);
	    current = activationRes;
	  }

	  for (var _i = 0, _intermediates = intermediates; _i < _intermediates.length; _i++) {
	    var i = _intermediates[_i];
	    backend.disposeIntermediateTensorInfo(i);
	  }

	  return current;
	}