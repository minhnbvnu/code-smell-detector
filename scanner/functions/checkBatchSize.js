function checkBatchSize(batchSize) {
	  assert(batchSize > 0 && Number.isInteger(batchSize), function () {
	    return "batchSize is required to be a positive integer, but got " + batchSize;
	  });
	}