function isNodesEquivalent(a, b) {
	  if ((typeof a === "undefined" ? "undefined" : (0, _typeof3.default)(a)) !== "object" || (typeof a === "undefined" ? "undefined" : (0, _typeof3.default)(a)) !== "object" || a == null || b == null) {
	    return a === b;
	  }

	  if (a.type !== b.type) {
	    return false;
	  }

	  var fields = (0, _keys2.default)(t.NODE_FIELDS[a.type] || a.type);

	  for (var _iterator2 = fields, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
	    var _ref2;

	    if (_isArray2) {
	      if (_i2 >= _iterator2.length) break;
	      _ref2 = _iterator2[_i2++];
	    } else {
	      _i2 = _iterator2.next();
	      if (_i2.done) break;
	      _ref2 = _i2.value;
	    }

	    var field = _ref2;

	    if ((0, _typeof3.default)(a[field]) !== (0, _typeof3.default)(b[field])) {
	      return false;
	    }

	    if (Array.isArray(a[field])) {
	      if (!Array.isArray(b[field])) {
	        return false;
	      }
	      if (a[field].length !== b[field].length) {
	        return false;
	      }

	      for (var i = 0; i < a[field].length; i++) {
	        if (!isNodesEquivalent(a[field][i], b[field][i])) {
	          return false;
	        }
	      }
	      continue;
	    }

	    if (!isNodesEquivalent(a[field], b[field])) {
	      return false;
	    }
	  }

	  return true;
	}