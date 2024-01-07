function findConstructorCall(path) {
	    var methods = path.get("body.body");

	    for (var _iterator = methods, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
	      var _ref2;

	      if (_isArray) {
	        if (_i >= _iterator.length) break;
	        _ref2 = _iterator[_i++];
	      } else {
	        _i = _iterator.next();
	        if (_i.done) break;
	        _ref2 = _i.value;
	      }

	      var method = _ref2;

	      if (method.node.kind === "constructorCall") {
	        return method;
	      }
	    }

	    return null;
	  }