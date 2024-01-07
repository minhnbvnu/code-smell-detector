function makeBatches(size, batchSize) {
	  var output = [];
	  var batchStart = 0;
	  var batchEnd = null;

	  while (batchStart < size) {
	    batchEnd = batchStart + batchSize;

	    if (batchEnd >= size) {
	      batchEnd = size;
	    }

	    output.push([batchStart, batchEnd]);
	    batchStart = batchEnd;
	  }

	  return output;
	}