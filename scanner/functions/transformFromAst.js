function transformFromAst(ast, code, options) {
	  return Babel.transformFromAst(ast, code, processOptions(options));
	}