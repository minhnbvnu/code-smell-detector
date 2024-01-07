function getStepsPerEpoch(dataset, args) {
	  // Attempt to determine # of batches in an epoch.
	  var stepsPerEpoch = null;

	  if (args.batchesPerEpoch != null) {
	    stepsPerEpoch = args.batchesPerEpoch;
	  } else if (Number.isFinite(dataset.size)) {
	    stepsPerEpoch = dataset.size;
	  }

	  return stepsPerEpoch;
	}