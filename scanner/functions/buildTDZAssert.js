function buildTDZAssert(node, file) {
	  return t.callExpression(file.addHelper("temporalRef"), [node, t.stringLiteral(node.name), file.addHelper("temporalUndefined")]);
	}