function getReductionStages(inShape) {
	  var stages = [];

	  while (stages.length === 0 || stages[stages.length - 1].outSize !== 1) {
	    var outSize = stages.length ? stages[stages.length - 1].outSize : inShape[1];
	    var windowSize = computeOptimalWindowSize(outSize);
	    stages.push({
	      inSize: outSize,
	      windowSize: windowSize,
	      outSize: Math.ceil(outSize / windowSize)
	    });
	  }

	  return stages;
	}