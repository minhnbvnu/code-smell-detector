function _fusedMatMul$1(args) {
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
	  return batchMatMulImpl({
	    a: a,
	    b: b,
	    transposeA: transposeA,
	    transposeB: transposeB,
	    backend: backend,
	    bias: bias,
	    preluActivationWeights: preluActivationWeights,
	    leakyreluAlpha: leakyreluAlpha,
	    activation: activation
	  });
	}