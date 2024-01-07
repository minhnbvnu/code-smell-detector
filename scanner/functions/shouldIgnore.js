function shouldIgnore(filename) {
	  var ignore = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	  var only = arguments[2];

	  filename = filename.replace(/\\/g, "/");

	  if (only) {
	    for (var _iterator = only, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
	      var _ref;

	      if (_isArray) {
	        if (_i >= _iterator.length) break;
	        _ref = _iterator[_i++];
	      } else {
	        _i = _iterator.next();
	        if (_i.done) break;
	        _ref = _i.value;
	      }

	      var pattern = _ref;

	      if (_shouldIgnore(pattern, filename)) return false;
	    }
	    return true;
	  } else if (ignore.length) {
	    for (var _iterator2 = ignore, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
	      var _ref2;

	      if (_isArray2) {
	        if (_i2 >= _iterator2.length) break;
	        _ref2 = _iterator2[_i2++];
	      } else {
	        _i2 = _iterator2.next();
	        if (_i2.done) break;
	        _ref2 = _i2.value;
	      }

	      var _pattern = _ref2;

	      if (_shouldIgnore(_pattern, filename)) return true;
	    }
	  }

	  return false;
	}