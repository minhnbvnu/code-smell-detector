function isValidRequireCall(path) {
	    if (!path.isCallExpression()) return false;
	    if (!path.get("callee").isIdentifier({ name: "require" })) return false;
	    if (path.scope.getBinding("require")) return false;

	    var args = path.get("arguments");
	    if (args.length !== 1) return false;

	    var arg = args[0];
	    if (!arg.isStringLiteral()) return false;

	    return true;
	  }