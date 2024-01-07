function multinomial$2(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var logits = inputs.logits;
	  var numSamples = attrs.numSamples,
	      seed = attrs.seed,
	      normalized = attrs.normalized;
	  var probs = normalized ? logits : softmax$3({
	    inputs: {
	      logits: logits
	    },
	    backend: backend,
	    attrs: {
	      dim: logits.shape.length - 1
	    }
	  });
	  var batchSize = probs.shape[0];
	  var numOutcomes = probs.shape[1];
	  var program = new MultinomialProgram(batchSize, numOutcomes, numSamples);
	  var customSetup = program.getCustomSetupFunc(seed);
	  var res = backend.runWebGLProgram(program, [probs], 'int32', customSetup);

	  if (!normalized) {
	    backend.disposeIntermediateTensorInfo(probs);
	  }

	  return res;
	}