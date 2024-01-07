function requeue() {
	  var pathToQueue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;

	  if (pathToQueue.removed) return;

	  var contexts = this.contexts;

	  for (var _iterator2 = contexts, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
	    var _ref2;

	    if (_isArray2) {
	      if (_i2 >= _iterator2.length) break;
	      _ref2 = _iterator2[_i2++];
	    } else {
	      _i2 = _iterator2.next();
	      if (_i2.done) break;
	      _ref2 = _i2.value;
	    }

	    var context = _ref2;

	    context.maybeQueue(pathToQueue);
	  }
	}