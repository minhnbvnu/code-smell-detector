function OneToManyIterator() {
	    var _this16;

	    _this16 = _LazyIterator11.call(this) || this;
	    _this16.outputQueue = new GrowingRingBuffer();
	    _this16.lastRead = Promise.resolve({
	      value: null,
	      done: false
	    });
	    return _this16;
	  }