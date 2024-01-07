function traverseFast(node, enter, opts) {
	  if (!node) return;

	  var keys = t.VISITOR_KEYS[node.type];
	  if (!keys) return;

	  opts = opts || {};
	  enter(node, opts);

	  for (var _iterator7 = keys, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : (0, _getIterator3.default)(_iterator7);;) {
	    var _ref7;

	    if (_isArray7) {
	      if (_i7 >= _iterator7.length) break;
	      _ref7 = _iterator7[_i7++];
	    } else {
	      _i7 = _iterator7.next();
	      if (_i7.done) break;
	      _ref7 = _i7.value;
	    }

	    var key = _ref7;

	    var subNode = node[key];

	    if (Array.isArray(subNode)) {
	      for (var _iterator8 = subNode, _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : (0, _getIterator3.default)(_iterator8);;) {
	        var _ref8;

	        if (_isArray8) {
	          if (_i8 >= _iterator8.length) break;
	          _ref8 = _iterator8[_i8++];
	        } else {
	          _i8 = _iterator8.next();
	          if (_i8.done) break;
	          _ref8 = _i8.value;
	        }

	        var _node = _ref8;

	        traverseFast(_node, enter, opts);
	      }
	    } else {
	      traverseFast(subNode, enter, opts);
	    }
	  }
	}