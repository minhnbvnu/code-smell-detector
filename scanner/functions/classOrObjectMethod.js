function classOrObjectMethod(path, callId) {
	  var node = path.node;
	  var body = node.body;

	  node.async = false;

	  var container = t.functionExpression(null, [], t.blockStatement(body.body), true);
	  container.shadow = true;
	  body.body = [t.returnStatement(t.callExpression(t.callExpression(callId, [container]), []))];

	  node.generator = false;
	}