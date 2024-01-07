function _call(fns) {
	  if (!fns) return false;

	  for (var _iterator = fns, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
	    var _ref;

	    if (_isArray) {
	      if (_i >= _iterator.length) break;
	      _ref = _iterator[_i++];
	    } else {
	      _i = _iterator.next();
	      if (_i.done) break;
	      _ref = _i.value;
	    }

	    var fn = _ref;

	    if (!fn) continue;

	    var node = this.node;
	    if (!node) return true;

	    var ret = fn.call(this.state, this, this.state);
	    if (ret) throw new Error("Unexpected return value from visitor method " + fn);

	    if (this.node !== node) return true;

	    if (this.shouldStop || this.shouldSkip || this.removed) return true;
	  }

	  return false;
	}