function SplitIteratorImpl(upstream, separator) {
	    var _this2;

	    _this2 = _OneToManyIterator.call(this) || this;
	    _this2.upstream = upstream;
	    _this2.separator = separator; // A partial string at the end of an upstream chunk

	    _this2.carryover = '';
	    return _this2;
	  }