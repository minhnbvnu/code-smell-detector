function iteratorFromConcatenatedFunction(iteratorFunc, count, baseErrorHandler) {
	  return iteratorFromConcatenated(iteratorFromFunction(iteratorFunc).take(count), baseErrorHandler);
	}