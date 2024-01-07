function gatherSequenceExpressions(nodes, scope, declars) {
	  var exprs = [];
	  var ensureLastUndefined = true;

	  for (var _iterator = nodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
	    var _ref;

	    if (_isArray) {
	      if (_i >= _iterator.length) break;
	      _ref = _iterator[_i++];
	    } else {
	      _i = _iterator.next();
	      if (_i.done) break;
	      _ref = _i.value;
	    }

	    var node = _ref;

	    ensureLastUndefined = false;

	    if (t.isExpression(node)) {
	      exprs.push(node);
	    } else if (t.isExpressionStatement(node)) {
	      exprs.push(node.expression);
	    } else if (t.isVariableDeclaration(node)) {
	      if (node.kind !== "var") return;

	      for (var _iterator2 = node.declarations, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
	        var _ref2;

	        if (_isArray2) {
	          if (_i2 >= _iterator2.length) break;
	          _ref2 = _iterator2[_i2++];
	        } else {
	          _i2 = _iterator2.next();
	          if (_i2.done) break;
	          _ref2 = _i2.value;
	        }

	        var declar = _ref2;

	        var bindings = t.getBindingIdentifiers(declar);
	        for (var key in bindings) {
	          declars.push({
	            kind: node.kind,
	            id: bindings[key]
	          });
	        }

	        if (declar.init) {
	          exprs.push(t.assignmentExpression("=", declar.id, declar.init));
	        }
	      }

	      ensureLastUndefined = true;
	    } else if (t.isIfStatement(node)) {
	      var consequent = node.consequent ? gatherSequenceExpressions([node.consequent], scope, declars) : scope.buildUndefinedNode();
	      var alternate = node.alternate ? gatherSequenceExpressions([node.alternate], scope, declars) : scope.buildUndefinedNode();
	      if (!consequent || !alternate) return;

	      exprs.push(t.conditionalExpression(node.test, consequent, alternate));
	    } else if (t.isBlockStatement(node)) {
	      var body = gatherSequenceExpressions(node.body, scope, declars);
	      if (!body) return;

	      exprs.push(body);
	    } else if (t.isEmptyStatement(node)) {
	      ensureLastUndefined = true;
	    } else {
	      return;
	    }
	  }

	  if (ensureLastUndefined) {
	    exprs.push(scope.buildUndefinedNode());
	  }

	  if (exprs.length === 1) {
	    return exprs[0];
	  } else {
	    return t.sequenceExpression(exprs);
	  }
	}