function isReferenced(node, parent) {
	  switch (parent.type) {
	    case "BindExpression":
	      return parent.object === node || parent.callee === node;

	    case "MemberExpression":
	    case "JSXMemberExpression":
	      if (parent.property === node && parent.computed) {
	        return true;
	      } else if (parent.object === node) {
	        return true;
	      } else {
	        return false;
	      }

	    case "MetaProperty":
	      return false;

	    case "ObjectProperty":
	      if (parent.key === node) {
	        return parent.computed;
	      }

	    case "VariableDeclarator":
	      return parent.id !== node;

	    case "ArrowFunctionExpression":
	    case "FunctionDeclaration":
	    case "FunctionExpression":
	      for (var _iterator = parent.params, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
	        var _ref;

	        if (_isArray) {
	          if (_i >= _iterator.length) break;
	          _ref = _iterator[_i++];
	        } else {
	          _i = _iterator.next();
	          if (_i.done) break;
	          _ref = _i.value;
	        }

	        var param = _ref;

	        if (param === node) return false;
	      }

	      return parent.id !== node;

	    case "ExportSpecifier":
	      if (parent.source) {
	        return false;
	      } else {
	        return parent.local === node;
	      }

	    case "ExportNamespaceSpecifier":
	    case "ExportDefaultSpecifier":
	      return false;

	    case "JSXAttribute":
	      return parent.name !== node;

	    case "ClassProperty":
	      if (parent.key === node) {
	        return parent.computed;
	      } else {
	        return parent.value === node;
	      }

	    case "ImportDefaultSpecifier":
	    case "ImportNamespaceSpecifier":
	    case "ImportSpecifier":
	      return false;

	    case "ClassDeclaration":
	    case "ClassExpression":
	      return parent.id !== node;

	    case "ClassMethod":
	    case "ObjectMethod":
	      return parent.key === node && parent.computed;

	    case "LabeledStatement":
	      return false;

	    case "CatchClause":
	      return parent.param !== node;

	    case "RestElement":
	      return false;

	    case "AssignmentExpression":
	      return parent.right === node;

	    case "AssignmentPattern":
	      return parent.right === node;

	    case "ObjectPattern":
	    case "ArrayPattern":
	      return false;
	  }

	  return true;
	}