function iteratorFromZipped(iterators, mismatchMode) {
	  if (mismatchMode === void 0) {
	    mismatchMode = ZipMismatchMode.FAIL;
	  }

	  return new ZipIterator(iterators, mismatchMode);
	}