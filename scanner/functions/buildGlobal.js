function buildGlobal(namespace, builder) {
	  var body = [];
	  var container = t.functionExpression(null, [t.identifier("global")], t.blockStatement(body));
	  var tree = t.program([t.expressionStatement(t.callExpression(container, [helpers.get("selfGlobal")]))]);

	  body.push(t.variableDeclaration("var", [t.variableDeclarator(namespace, t.assignmentExpression("=", t.memberExpression(t.identifier("global"), namespace), t.objectExpression([])))]));

	  builder(body);

	  return tree;
	}