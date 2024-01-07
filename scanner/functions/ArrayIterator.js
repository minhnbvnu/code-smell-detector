function ArrayIterator(items) {
	    var _this;

	    _this = _LazyIterator.call(this) || this;
	    _this.items = items;
	    _this.trav = 0;
	    return _this;
	  }