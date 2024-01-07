function multinomial$1(args) {
	  var inputs = args.inputs,
	      backend = args.backend,
	      attrs = args.attrs;
	  var logits = inputs.logits;
	  var numSamples = attrs.numSamples,
	      seed = attrs.seed,
	      normalized = attrs.normalized;
	  assertNotComplex(logits, 'multinomial');
	  var probabilities = normalized ? logits : softmax$2({
	    inputs: {
	      logits: logits
	    },
	    backend: backend,
	    attrs: {
	      dim: -1
	    }
	  });
	  var batchSize = probabilities.shape[0];
	  var numEvents = probabilities.shape[1];
	  var probVals = backend.data.get(probabilities.dataId).values;
	  var resShape = [batchSize, numSamples];
	  var resVals = makeZerosTypedArray(sizeFromShape(resShape), 'int32');

	  for (var b = 0; b < batchSize; ++b) {
	    var offset = b * numEvents; // The cdf won't include the last event. It will be implicit if no other
	    // event happened.

	    var cdf = new Float32Array(numEvents - 1);
	    cdf[0] = probVals[offset];

	    for (var event = 1; event < cdf.length; ++event) {
	      cdf[event] = cdf[event - 1] + probVals[offset + event];
	    }

	    var random = seedrandom_1(seed.toString());
	    var outOffset = b * numSamples;

	    for (var sampleId = 0; sampleId < numSamples; ++sampleId) {
	      var r = random(); // Assume last event happened by default.

	      resVals[outOffset + sampleId] = cdf.length;

	      for (var _event = 0; _event < cdf.length; _event++) {
	        if (r < cdf[_event]) {
	          resVals[outOffset + sampleId] = _event;
	          break;
	        }
	      }
	    }
	  }

	  if (!normalized) {
	    backend.disposeIntermediateTensorInfo(probabilities);
	  }

	  return backend.makeTensorInfo(resShape, 'int32', resVals);
	}