function expandAliases(obj) {
	  var newObj = {};

	  function add(type, func) {
	    var fn = newObj[type];
	    newObj[type] = fn ? function (node, parent, stack) {
	      var result = fn(node, parent, stack);

	      return result == null ? func(node, parent, stack) : result;
	    } : func;
	  }

	  for (var _iterator = (0, _keys2.default)(obj), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
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

	    var aliases = t.FLIPPED_ALIAS_KEYS[type];
	    if (aliases) {
	      for (var _iterator2 = aliases, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
	        var _ref2;

	        if (_isArray2) {
	          if (_i2 >= _iterator2.length) break;
	          _ref2 = _iterator2[_i2++];
	        } else {
	          _i2 = _iterator2.next();
	          if (_i2.done) break;
	          _ref2 = _i2.value;
	        }

	        var alias = _ref2;

	        add(alias, obj[type]);
	      }
	    } else {
	      add(type, obj[type]);
	    }
	  }

	  return newObj;
	}