function Utf8Iterator(upstream) {
	    var _this;

	    _this = _StringIterator.call(this) || this;
	    _this.upstream = upstream;
	    _this.impl = new Utf8IteratorImpl(upstream);
	    return _this;
	  }