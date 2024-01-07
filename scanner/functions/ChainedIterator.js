function ChainedIterator(iterators, baseErrorHandler) {
	    var _this19;

	    _this19 = _LazyIterator12.call(this) || this;
	    _this19.baseErrorHandler = baseErrorHandler; // Strict Promise execution order:
	    // a next() call may not even begin until the previous one completes.

	    _this19.lastRead = null; // Local state that should not be clobbered by out-of-order execution.

	    _this19.iterator = null;
	    _this19.moreIterators = iterators;
	    return _this19;
	  }