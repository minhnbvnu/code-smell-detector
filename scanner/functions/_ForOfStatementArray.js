function _ForOfStatementArray(path) {
	    var node = path.node,
	        scope = path.scope;

	    var nodes = [];
	    var right = node.right;

	    if (!t.isIdentifier(right) || !scope.hasBinding(right.name)) {
	      var uid = scope.generateUidIdentifier("arr");
	      nodes.push(t.variableDeclaration("var", [t.variableDeclarator(uid, right)]));
	      right = uid;
	    }

	    var iterationKey = scope.generateUidIdentifier("i");

	    var loop = buildForOfArray({
	      BODY: node.body,
	      KEY: iterationKey,
	      ARR: right
	    });

	    t.inherits(loop, node);
	    t.ensureBlock(loop);

	    var iterationValue = t.memberExpression(right, iterationKey, true);

	    var left = node.left;
	    if (t.isVariableDeclaration(left)) {
	      left.declarations[0].init = iterationValue;
	      loop.body.body.unshift(left);
	    } else {
	      loop.body.body.unshift(t.expressionStatement(t.assignmentExpression("=", left, iterationValue)));
	    }

	    if (path.parentPath.isLabeledStatement()) {
	      loop = t.labeledStatement(path.parentPath.node.label, loop);
	    }

	    nodes.push(loop);

	    return nodes;
	  }