function assertNodeType() {
	  for (var _len2 = arguments.length, types = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    types[_key2] = arguments[_key2];
	  }

	  function validate(node, key, val) {
	    var valid = false;

	    for (var _iterator = types, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
	      var _ref;

	      if (_isArray) {
	        if (_i >= _iterator.length) break;
	        _ref = _iterator[_i++];
	      } else {
	        _i = _iterator.next();
	        if (_i.done) break;
	        _ref = _i.value;
	      }

	      var type = _ref;

	      if (t.is(type, val)) {
	        valid = true;
	        break;
	      }
	    }

	    if (!valid) {
	      throw new TypeError("Property " + key + " of " + node.type + " expected node to be of a type " + (0, _stringify2.default)(types) + " " + ("but instead got " + (0, _stringify2.default)(val && val.type)));
	    }
	  }

	  validate.oneOfNodeTypes = types;

	  return validate;
	}