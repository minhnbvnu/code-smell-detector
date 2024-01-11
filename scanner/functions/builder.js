function builder() {
	    if (arguments.length > keys.length) {
	      throw new Error("t." + type + ": Too many arguments passed. Received " + arguments.length + " but can receive " + ("no more than " + keys.length));
	    }

	    var node = {};
	    node.type = type;

	    var i = 0;

	    for (var _iterator2 = keys, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
	      var _ref2;

	      if (_isArray2) {
	        if (_i2 >= _iterator2.length) break;
	        _ref2 = _iterator2[_i2++];
	      } else {
	        _i2 = _iterator2.next();
	        if (_i2.done) break;
	        _ref2 = _i2.value;
	      }

	      var _key = _ref2;

	      var field = t.NODE_FIELDS[type][_key];

	      var arg = arguments[i++];
	      if (arg === undefined) arg = (0, _clone2.default)(field.default);

	      node[_key] = arg;
	    }

	    for (var key in node) {
	      validate(node, key, node[key]);
	    }

	    return node;
	  }