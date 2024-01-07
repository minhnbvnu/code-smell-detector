function bindifyDecorators(decorators) {
	  for (var _iterator = decorators, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
	    var _ref;

	    if (_isArray) {
	      if (_i >= _iterator.length) break;
	      _ref = _iterator[_i++];
	    } else {
	      _i = _iterator.next();
	      if (_i.done) break;
	      _ref = _i.value;
	    }

	    var decoratorPath = _ref;

	    var decorator = decoratorPath.node;
	    var expression = decorator.expression;
	    if (!t.isMemberExpression(expression)) continue;

	    var temp = decoratorPath.scope.maybeGenerateMemoised(expression.object);
	    var ref = void 0;

	    var nodes = [];

	    if (temp) {
	      ref = temp;
	      nodes.push(t.assignmentExpression("=", temp, expression.object));
	    } else {
	      ref = expression.object;
	    }

	    nodes.push(t.callExpression(t.memberExpression(t.memberExpression(ref, expression.property, expression.computed), t.identifier("bind")), [ref]));

	    if (nodes.length === 1) {
	      decorator.expression = nodes[0];
	    } else {
	      decorator.expression = t.sequenceExpression(nodes);
	    }
	  }
	}