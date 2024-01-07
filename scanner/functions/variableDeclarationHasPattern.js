function variableDeclarationHasPattern(node) {
	    for (var _iterator = node.declarations, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
	      var _ref2;

	      if (_isArray) {
	        if (_i >= _iterator.length) break;
	        _ref2 = _iterator[_i++];
	      } else {
	        _i = _iterator.next();
	        if (_i.done) break;
	        _ref2 = _i.value;
	      }

	      var declar = _ref2;

	      if (t.isPattern(declar.id)) {
	        return true;
	      }
	    }
	    return false;
	  }