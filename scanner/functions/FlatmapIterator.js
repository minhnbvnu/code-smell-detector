function FlatmapIterator(upstream, transform) {
	    var _this18;

	    _this18 = _OneToManyIterator.call(this) || this;
	    _this18.upstream = upstream;
	    _this18.transform = transform;
	    return _this18;
	  }