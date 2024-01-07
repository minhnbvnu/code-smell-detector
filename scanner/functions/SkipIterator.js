function SkipIterator(upstream, maxCount) {
	    var _this5;

	    _this5 = _LazyIterator4.call(this) || this;
	    _this5.upstream = upstream;
	    _this5.maxCount = maxCount; // Local state that should not be clobbered by out-of-order execution.

	    _this5.count = 0;
	    _this5.lastRead = Promise.resolve({
	      value: null,
	      done: false
	    });
	    return _this5;
	  }