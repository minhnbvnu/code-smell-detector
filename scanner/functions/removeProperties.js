function removeProperties(node, opts) {
	  opts = opts || {};
	  var map = opts.preserveComments ? CLEAR_KEYS : CLEAR_KEYS_PLUS_COMMENTS;
	  for (var _iterator9 = map, _isArray9 = Array.isArray(_iterator9), _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : (0, _getIterator3.default)(_iterator9);;) {
	    var _ref9;

	    if (_isArray9) {
	      if (_i9 >= _iterator9.length) break;
	      _ref9 = _iterator9[_i9++];
	    } else {
	      _i9 = _iterator9.next();
	      if (_i9.done) break;
	      _ref9 = _i9.value;
	    }

	    var _key4 = _ref9;

	    if (node[_key4] != null) node[_key4] = undefined;
	  }

	  for (var key in node) {
	    if (key[0] === "_" && node[key] != null) node[key] = undefined;
	  }

	  var syms = (0, _getOwnPropertySymbols2.default)(node);
	  for (var _iterator10 = syms, _isArray10 = Array.isArray(_iterator10), _i10 = 0, _iterator10 = _isArray10 ? _iterator10 : (0, _getIterator3.default)(_iterator10);;) {
	    var _ref10;

	    if (_isArray10) {
	      if (_i10 >= _iterator10.length) break;
	      _ref10 = _iterator10[_i10++];
	    } else {
	      _i10 = _iterator10.next();
	      if (_i10.done) break;
	      _ref10 = _i10.value;
	    }

	    var sym = _ref10;

	    node[sym] = null;
	  }
	}