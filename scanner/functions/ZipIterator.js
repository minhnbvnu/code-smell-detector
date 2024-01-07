function ZipIterator(iterators, mismatchMode) {
	    var _this20;

	    if (mismatchMode === void 0) {
	      mismatchMode = ZipMismatchMode.FAIL;
	    }

	    _this20 = _LazyIterator13.call(this) || this;
	    _this20.iterators = iterators;
	    _this20.mismatchMode = mismatchMode;
	    _this20.count = 0;
	    _this20.currentPromise = null;
	    return _this20;
	  }