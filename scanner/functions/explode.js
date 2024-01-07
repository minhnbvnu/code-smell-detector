function explode(visitor) {
	  if (visitor._exploded) return visitor;
	  visitor._exploded = true;

	  for (var nodeType in visitor) {
	    if (shouldIgnoreKey(nodeType)) continue;

	    var parts = nodeType.split("|");
	    if (parts.length === 1) continue;

	    var fns = visitor[nodeType];
	    delete visitor[nodeType];

	    for (var _iterator = parts, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
	      var _ref;

	      if (_isArray) {
	        if (_i >= _iterator.length) break;
	        _ref = _iterator[_i++];
	      } else {
	        _i = _iterator.next();
	        if (_i.done) break;
	        _ref = _i.value;
	      }

	      var part = _ref;

	      visitor[part] = fns;
	    }
	  }

	  verify(visitor);

	  delete visitor.__esModule;

	  ensureEntranceObjects(visitor);

	  ensureCallbackArrays(visitor);

	  for (var _iterator2 = (0, _keys2.default)(visitor), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
	    var _ref2;

	    if (_isArray2) {
	      if (_i2 >= _iterator2.length) break;
	      _ref2 = _iterator2[_i2++];
	    } else {
	      _i2 = _iterator2.next();
	      if (_i2.done) break;
	      _ref2 = _i2.value;
	    }

	    var _nodeType3 = _ref2;

	    if (shouldIgnoreKey(_nodeType3)) continue;

	    var wrapper = virtualTypes[_nodeType3];
	    if (!wrapper) continue;

	    var _fns2 = visitor[_nodeType3];
	    for (var type in _fns2) {
	      _fns2[type] = wrapCheck(wrapper, _fns2[type]);
	    }

	    delete visitor[_nodeType3];

	    if (wrapper.types) {
	      for (var _iterator4 = wrapper.types, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : (0, _getIterator3.default)(_iterator4);;) {
	        var _ref4;

	        if (_isArray4) {
	          if (_i4 >= _iterator4.length) break;
	          _ref4 = _iterator4[_i4++];
	        } else {
	          _i4 = _iterator4.next();
	          if (_i4.done) break;
	          _ref4 = _i4.value;
	        }

	        var _type = _ref4;

	        if (visitor[_type]) {
	          mergePair(visitor[_type], _fns2);
	        } else {
	          visitor[_type] = _fns2;
	        }
	      }
	    } else {
	      mergePair(visitor, _fns2);
	    }
	  }

	  for (var _nodeType in visitor) {
	    if (shouldIgnoreKey(_nodeType)) continue;

	    var _fns = visitor[_nodeType];

	    var aliases = t.FLIPPED_ALIAS_KEYS[_nodeType];

	    var deprecratedKey = t.DEPRECATED_KEYS[_nodeType];
	    if (deprecratedKey) {
	      console.trace("Visitor defined for " + _nodeType + " but it has been renamed to " + deprecratedKey);
	      aliases = [deprecratedKey];
	    }

	    if (!aliases) continue;

	    delete visitor[_nodeType];

	    for (var _iterator3 = aliases, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
	      var _ref3;

	      if (_isArray3) {
	        if (_i3 >= _iterator3.length) break;
	        _ref3 = _iterator3[_i3++];
	      } else {
	        _i3 = _iterator3.next();
	        if (_i3.done) break;
	        _ref3 = _i3.value;
	      }

	      var alias = _ref3;

	      var existing = visitor[alias];
	      if (existing) {
	        mergePair(existing, _fns);
	      } else {
	        visitor[alias] = (0, _clone2.default)(_fns);
	      }
	    }
	  }

	  for (var _nodeType2 in visitor) {
	    if (shouldIgnoreKey(_nodeType2)) continue;

	    ensureCallbackArrays(visitor[_nodeType2]);
	  }

	  return visitor;
	}