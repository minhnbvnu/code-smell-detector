function buildUmd(namespace, builder) {
	  var body = [];
	  body.push(t.variableDeclaration("var", [t.variableDeclarator(namespace, t.identifier("global"))]));

	  builder(body);

	  return t.program([buildUmdWrapper({
	    FACTORY_PARAMETERS: t.identifier("global"),
	    BROWSER_ARGUMENTS: t.assignmentExpression("=", t.memberExpression(t.identifier("root"), namespace), t.objectExpression([])),
	    COMMON_ARGUMENTS: t.identifier("exports"),
	    AMD_ARGUMENTS: t.arrayExpression([t.stringLiteral("exports")]),
	    FACTORY_BODY: body,
	    UMD_ROOT: t.identifier("this")
	  })]);
	}