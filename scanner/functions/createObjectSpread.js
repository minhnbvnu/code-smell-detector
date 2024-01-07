function createObjectSpread(file, props, objRef) {
	    var restProperty = props.pop();

	    var keys = [];
	    for (var _iterator2 = props, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
	      var _ref3;

	      if (_isArray2) {
	        if (_i2 >= _iterator2.length) break;
	        _ref3 = _iterator2[_i2++];
	      } else {
	        _i2 = _iterator2.next();
	        if (_i2.done) break;
	        _ref3 = _i2.value;
	      }

	      var prop = _ref3;

	      var key = prop.key;
	      if (t.isIdentifier(key) && !prop.computed) {
	        key = t.stringLiteral(prop.key.name);
	      }
	      keys.push(key);
	    }

	    return [restProperty.argument, t.callExpression(file.addHelper("objectWithoutProperties"), [objRef, t.arrayExpression(keys)])];
	  }