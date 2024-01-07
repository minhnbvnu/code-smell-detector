function transformClass(path, ref, state) {
	    var nodes = [];

	    state;

	    var classDecorators = path.node.decorators;
	    if (classDecorators) {
	      path.node.decorators = null;
	      classDecorators = cleanDecorators(classDecorators);

	      for (var _iterator = classDecorators, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
	        var _ref2;

	        if (_isArray) {
	          if (_i >= _iterator.length) break;
	          _ref2 = _iterator[_i++];
	        } else {
	          _i = _iterator.next();
	          if (_i.done) break;
	          _ref2 = _i.value;
	        }

	        var decorator = _ref2;

	        nodes.push(buildClassDecorator({
	          CLASS_REF: ref,
	          DECORATOR: decorator
	        }));
	      }
	    }

	    var map = (0, _create2.default)(null);

	    for (var _iterator2 = path.get("body.body"), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
	      var _ref3;

	      if (_isArray2) {
	        if (_i2 >= _iterator2.length) break;
	        _ref3 = _iterator2[_i2++];
	      } else {
	        _i2 = _iterator2.next();
	        if (_i2.done) break;
	        _ref3 = _i2.value;
	      }

	      var method = _ref3;

	      var decorators = method.node.decorators;
	      if (!decorators) continue;

	      var _alias = t.toKeyAlias(method.node);
	      map[_alias] = map[_alias] || [];
	      map[_alias].push(method.node);

	      method.remove();
	    }

	    for (var alias in map) {
	      var items = map[alias];

	      items;
	    }

	    return nodes;
	  }