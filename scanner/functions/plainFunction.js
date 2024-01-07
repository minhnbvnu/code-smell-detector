function plainFunction(path, callId) {
	  var node = path.node;
	  var isDeclaration = path.isFunctionDeclaration();
	  var asyncFnId = node.id;
	  var wrapper = buildWrapper;

	  if (path.isArrowFunctionExpression()) {
	    path.arrowFunctionToShadowed();
	  } else if (!isDeclaration && asyncFnId) {
	    wrapper = namedBuildWrapper;
	  }

	  node.async = false;
	  node.generator = true;

	  node.id = null;

	  if (isDeclaration) {
	    node.type = "FunctionExpression";
	  }

	  var built = t.callExpression(callId, [node]);
	  var container = wrapper({
	    NAME: asyncFnId,
	    REF: path.scope.generateUidIdentifier("ref"),
	    FUNCTION: built,
	    PARAMS: node.params.reduce(function (acc, param) {
	      acc.done = acc.done || t.isAssignmentPattern(param) || t.isRestElement(param);

	      if (!acc.done) {
	        acc.params.push(path.scope.generateUidIdentifier("x"));
	      }

	      return acc;
	    }, {
	      params: [],
	      done: false
	    }).params
	  }).expression;

	  if (isDeclaration) {
	    var declar = t.variableDeclaration("let", [t.variableDeclarator(t.identifier(asyncFnId.name), t.callExpression(container, []))]);
	    declar._blockHoist = true;

	    path.replaceWith(declar);
	  } else {
	    var retFunction = container.body.body[1].argument;
	    if (!asyncFnId) {
	      (0, _babelHelperFunctionName2.default)({
	        node: retFunction,
	        parent: path.parent,
	        scope: path.scope
	      });
	    }

	    if (!retFunction || retFunction.id || node.params.length) {
	      path.replaceWith(t.callExpression(container, []));
	    } else {
	      path.replaceWith(built);
	    }
	  }
	}