function validateVisitorMethods(path, val) {
	  var fns = [].concat(val);
	  for (var _iterator5 = fns, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : (0, _getIterator3.default)(_iterator5);;) {
	    var _ref5;

	    if (_isArray5) {
	      if (_i5 >= _iterator5.length) break;
	      _ref5 = _iterator5[_i5++];
	    } else {
	      _i5 = _iterator5.next();
	      if (_i5.done) break;
	      _ref5 = _i5.value;
	    }

	    var fn = _ref5;

	    if (typeof fn !== "function") {
	      throw new TypeError("Non-function found defined in " + path + " with type " + (typeof fn === "undefined" ? "undefined" : (0, _typeof3.default)(fn)));
	    }
	  }
	}