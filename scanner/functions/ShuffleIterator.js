function ShuffleIterator(upstream, windowSize, seed) {
	    var _this22;

	    _this22 = _PrefetchIterator.call(this, upstream, windowSize) || this;
	    _this22.upstream = upstream;
	    _this22.windowSize = windowSize; // Local state that should not be clobbered by out-of-order execution.

	    _this22.upstreamExhausted = false;
	    _this22.random = seedrandom_1(seed || now().toString());
	    _this22.lastRead = Promise.resolve({
	      value: null,
	      done: false
	    });
	    return _this22;
	  }