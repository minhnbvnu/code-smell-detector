function assertNodeOrValueType() {
	  for (var _len3 = arguments.length, types = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	    types[_key3] = arguments[_key3];
	  }

	  function validate(node, key, val) {
	    var valid = false;

	    for (var _iterator2 = types, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
	      var _ref2;

	      if (_isArray2) {
	        if (_i2 >= _iterator2.length) break;
	        _ref2 = _iterator2[_i2++];
	      } else {
	        _i2 = _iterator2.next();
	        if (_i2.done) break;
	        _ref2 = _i2.value;
	      }

	      var type = _ref2;

	      if (getType(val) === type || t.is(type, val)) {
	        valid = true;
	        break;
	      }
	    }

	    if (!valid) {
	      throw new TypeError("Property " + key + " of " + node.type + " expected node to be of a type " + (0, _stringify2.default)(types) + " " + ("but instead got " + (0, _stringify2.default)(val && val.type)));
	    }
	  }

	  validate.oneOfNodeOrValueTypes = types;

	  return validate;
	}