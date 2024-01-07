function hasDecorators(path) {
	    if (path.isClass()) {
	      if (path.node.decorators) return true;

	      for (var _iterator3 = path.node.body.body, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
	        var _ref4;

	        if (_isArray3) {
	          if (_i3 >= _iterator3.length) break;
	          _ref4 = _iterator3[_i3++];
	        } else {
	          _i3 = _iterator3.next();
	          if (_i3.done) break;
	          _ref4 = _i3.value;
	        }

	        var method = _ref4;

	        if (method.decorators) {
	          return true;
	        }
	      }
	    } else if (path.isObjectExpression()) {
	      for (var _iterator4 = path.node.properties, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : (0, _getIterator3.default)(_iterator4);;) {
	        var _ref5;

	        if (_isArray4) {
	          if (_i4 >= _iterator4.length) break;
	          _ref5 = _iterator4[_i4++];
	        } else {
	          _i4 = _iterator4.next();
	          if (_i4.done) break;
	          _ref5 = _i4.value;
	        }

	        var prop = _ref5;

	        if (prop.decorators) {
	          return true;
	        }
	      }
	    }

	    return false;
	  }