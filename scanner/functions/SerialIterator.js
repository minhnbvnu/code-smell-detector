function SerialIterator(upstream) {
	    var _this3;

	    _this3 = _LazyIterator3.call(this) || this;
	    _this3.upstream = upstream;
	    _this3.lastRead = Promise.resolve({
	      value: null,
	      done: false
	    });
	    return _this3;
	  }