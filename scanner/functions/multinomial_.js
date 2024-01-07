function multinomial_(logits, numSamples, seed, normalized) {
	  if (normalized === void 0) {
	    normalized = false;
	  }

	  var $logits = convertToTensor(logits, 'logits', 'multinomial');
	  var numOutcomes = $logits.size;
	  var origRank = $logits.rank;

	  if (numOutcomes < 2) {
	    throw new Error("Error in multinomial: you need at least 2 outcomes, but got " + (numOutcomes + "."));
	  }

	  if (origRank > 2) {
	    throw new Error("Rank of probabilities must be 1 or 2, but is " + origRank);
	  } // TODO(lina128): Investigate correct seed behavior. The code seems not allow
	  // setting see to 0.


	  seed = seed || Math.random(); // The kernel only accepts (and returns) rank 2 tensors.

	  var logits2D = origRank === 1 ? reshape($logits, [1, -1]) : $logits;
	  var inputs = {
	    logits: logits2D
	  };
	  var attrs = {
	    numSamples: numSamples,
	    seed: seed,
	    normalized: normalized
	  }; // tslint:disable-next-line: no-unnecessary-type-assertion

	  var res = ENGINE.runKernel(Multinomial, inputs, attrs); // tslint:disable-next-line:no-unnecessary-type-assertion

	  return origRank === 1 ? reshape(res, [res.size]) : res;
	}