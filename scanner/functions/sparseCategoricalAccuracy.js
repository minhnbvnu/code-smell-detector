function sparseCategoricalAccuracy(yTrue, yPred) {
	  if (yTrue.rank === yPred.rank) {
	    yTrue = yTrue.squeeze([yTrue.rank - 1]);
	  }

	  yPred = yPred.argMax(-1);

	  if (yPred.dtype !== yTrue.dtype) {
	    yPred = yPred.asType(yTrue.dtype);
	  }

	  return equal(yTrue, yPred).asType('float32');
	}