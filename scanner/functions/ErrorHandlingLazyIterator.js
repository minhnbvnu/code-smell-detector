function ErrorHandlingLazyIterator(upstream, handler) {
	    var _this13;

	    _this13 = _LazyIterator9.call(this) || this;
	    _this13.upstream = upstream;
	    _this13.handler = handler;
	    _this13.count = 0;
	    _this13.lastRead = Promise.resolve({
	      value: null,
	      done: false
	    });
	    return _this13;
	  }