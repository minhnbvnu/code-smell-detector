function iteratorFromConcatenated(baseIterators, baseErrorHandler) {
	  return new ChainedIterator(baseIterators, baseErrorHandler);
	}