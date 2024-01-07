function PrefetchIterator(upstream, bufferSize) {
	    var _this21;

	    _this21 = _LazyIterator14.call(this) || this;
	    _this21.upstream = upstream;
	    _this21.bufferSize = bufferSize;
	    _this21.buffer = new RingBuffer(bufferSize);
	    return _this21;
	  }