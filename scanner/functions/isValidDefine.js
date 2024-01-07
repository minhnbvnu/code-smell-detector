function isValidDefine(path) {
	    if (!path.isExpressionStatement()) return;

	    var expr = path.get("expression");
	    if (!expr.isCallExpression()) return false;
	    if (!expr.get("callee").isIdentifier({ name: "define" })) return false;

	    var args = expr.get("arguments");
	    if (args.length === 3 && !args.shift().isStringLiteral()) return false;
	    if (args.length !== 2) return false;
	    if (!args.shift().isArrayExpression()) return false;
	    if (!args.shift().isFunctionExpression()) return false;

	    return true;
	  }