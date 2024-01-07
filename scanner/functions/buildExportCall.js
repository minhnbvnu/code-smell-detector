function buildExportCall(name, val) {
	            return t.expressionStatement(t.callExpression(exportIdent, [t.stringLiteral(name), val]));
	          }