function FilterIterator(upstream, predicate) {
	    var _this10;

	    _this10 = _LazyIterator7.call(this) || this;
	    _this10.upstream = upstream;
	    _this10.predicate = predicate;
	    _this10.lastRead = Promise.resolve({
	      value: null,
	      done: false
	    });
	    return _this10;
	  }