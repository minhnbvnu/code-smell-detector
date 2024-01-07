function SplitIterator(upstream, separator) {
	    var _this;

	    _this = _StringIterator.call(this) || this;
	    _this.upstream = upstream;
	    _this.impl = new SplitIteratorImpl(upstream, separator);
	    return _this;
	  }