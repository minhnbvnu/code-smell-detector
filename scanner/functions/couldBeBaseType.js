function couldBeBaseType(name) {
	  var type = this.getTypeAnnotation();
	  if (t.isAnyTypeAnnotation(type)) return true;

	  if (t.isUnionTypeAnnotation(type)) {
	    for (var _iterator = type.types, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
	      var _ref;

	      if (_isArray) {
	        if (_i >= _iterator.length) break;
	        _ref = _iterator[_i++];
	      } else {
	        _i = _iterator.next();
	        if (_i.done) break;
	        _ref = _i.value;
	      }

	      var type2 = _ref;

	      if (t.isAnyTypeAnnotation(type2) || _isBaseType(name, type2, true)) {
	        return true;
	      }
	    }
	    return false;
	  } else {
	    return _isBaseType(name, type, true);
	  }
	}