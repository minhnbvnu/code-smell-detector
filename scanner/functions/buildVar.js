function buildVar(namespace, builder) {
	  var body = [];
	  body.push(t.variableDeclaration("var", [t.variableDeclarator(namespace, t.objectExpression([]))]));
	  builder(body);
	  body.push(t.expressionStatement(namespace));
	  return t.program(body);
	}