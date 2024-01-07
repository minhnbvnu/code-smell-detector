function replaceExpressionWithStatements(nodes) {
	  this.resync();

	  var toSequenceExpression = t.toSequenceExpression(nodes, this.scope);

	  if (t.isSequenceExpression(toSequenceExpression)) {
	    var exprs = toSequenceExpression.expressions;

	    if (exprs.length >= 2 && this.parentPath.isExpressionStatement()) {
	      this._maybePopFromStatements(exprs);
	    }

	    if (exprs.length === 1) {
	      this.replaceWith(exprs[0]);
	    } else {
	      this.replaceWith(toSequenceExpression);
	    }
	  } else if (toSequenceExpression) {
	    this.replaceWith(toSequenceExpression);
	  } else {
	    var container = t.functionExpression(null, [], t.blockStatement(nodes));
	    container.shadow = true;

	    this.replaceWith(t.callExpression(container, []));
	    this.traverse(hoistVariablesVisitor);

	    var completionRecords = this.get("callee").getCompletionRecords();
	    for (var _iterator2 = completionRecords, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
	      var _ref2;

	      if (_isArray2) {
	        if (_i2 >= _iterator2.length) break;
	        _ref2 = _iterator2[_i2++];
	      } else {
	        _i2 = _iterator2.next();
	        if (_i2.done) break;
	        _ref2 = _i2.value;
	      }

	      var path = _ref2;

	      if (!path.isExpressionStatement()) continue;

	      var loop = path.findParent(function (path) {
	        return path.isLoop();
	      });
	      if (loop) {
	        var uid = loop.getData("expressionReplacementReturnUid");

	        if (!uid) {
	          var callee = this.get("callee");
	          uid = callee.scope.generateDeclaredUidIdentifier("ret");
	          callee.get("body").pushContainer("body", t.returnStatement(uid));
	          loop.setData("expressionReplacementReturnUid", uid);
	        } else {
	          uid = t.identifier(uid.name);
	        }

	        path.get("expression").replaceWith(t.assignmentExpression("=", uid, path.node.expression));
	      } else {
	        path.replaceWith(t.returnStatement(path.node.expression));
	      }
	    }

	    return this.node;
	  }
	}