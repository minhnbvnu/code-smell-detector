function isFirstInStatement(printStack) {
	  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref$considerArrow = _ref.considerArrow,
	      considerArrow = _ref$considerArrow === undefined ? false : _ref$considerArrow,
	      _ref$considerDefaultE = _ref.considerDefaultExports,
	      considerDefaultExports = _ref$considerDefaultE === undefined ? false : _ref$considerDefaultE;

	  var i = printStack.length - 1;
	  var node = printStack[i];
	  i--;
	  var parent = printStack[i];
	  while (i > 0) {
	    if (t.isExpressionStatement(parent, { expression: node }) || t.isTaggedTemplateExpression(parent) || considerDefaultExports && t.isExportDefaultDeclaration(parent, { declaration: node }) || considerArrow && t.isArrowFunctionExpression(parent, { body: node })) {
	      return true;
	    }

	    if (t.isCallExpression(parent, { callee: node }) || t.isSequenceExpression(parent) && parent.expressions[0] === node || t.isMemberExpression(parent, { object: node }) || t.isConditional(parent, { test: node }) || t.isBinary(parent, { left: node }) || t.isAssignmentExpression(parent, { left: node })) {
	      node = parent;
	      i--;
	      parent = printStack[i];
	    } else {
	      return false;
	    }
	  }

	  return false;
	}