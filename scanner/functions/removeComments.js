function removeComments(node) {
	  for (var _iterator4 = t.COMMENT_KEYS, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : (0, _getIterator3.default)(_iterator4);;) {
	    var _ref4;

	    if (_isArray4) {
	      if (_i4 >= _iterator4.length) break;
	      _ref4 = _iterator4[_i4++];
	    } else {
	      _i4 = _iterator4.next();
	      if (_i4.done) break;
	      _ref4 = _i4.value;
	    }

	    var key = _ref4;

	    delete node[key];
	  }
	  return node;
	}