function shallowEqual(actual, expected) {
	  var keys = (0, _keys2.default)(expected);

	  for (var _iterator3 = keys, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
	    var _ref3;

	    if (_isArray3) {
	      if (_i3 >= _iterator3.length) break;
	      _ref3 = _iterator3[_i3++];
	    } else {
	      _i3 = _iterator3.next();
	      if (_i3.done) break;
	      _ref3 = _i3.value;
	    }

	    var key = _ref3;

	    if (actual[key] !== expected[key]) {
	      return false;
	    }
	  }

	  return true;
	}