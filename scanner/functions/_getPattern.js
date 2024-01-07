function _getPattern(parts, context) {
	  var path = this;
	  for (var _iterator = parts, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
	    var _ref;

	    if (_isArray) {
	      if (_i >= _iterator.length) break;
	      _ref = _iterator[_i++];
	    } else {
	      _i = _iterator.next();
	      if (_i.done) break;
	      _ref = _i.value;
	    }

	    var part = _ref;

	    if (part === ".") {
	      path = path.parentPath;
	    } else {
	      if (Array.isArray(path)) {
	        path = path[part];
	      } else {
	        path = path.get(part, context);
	      }
	    }
	  }
	  return path;
	}