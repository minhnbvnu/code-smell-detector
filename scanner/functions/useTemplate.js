function useTemplate(ast, nodes) {
	  ast = (0, _cloneDeep2.default)(ast);
	  var _ast = ast,
	      program = _ast.program;

	  if (nodes.length) {
	    (0, _babelTraverse2.default)(ast, templateVisitor, null, nodes);
	  }

	  if (program.body.length > 1) {
	    return program.body;
	  } else {
	    return program.body[0];
	  }
	}