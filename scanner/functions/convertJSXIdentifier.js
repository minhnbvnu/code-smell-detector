function convertJSXIdentifier(node, parent) {
	    if (t.isJSXIdentifier(node)) {
	      if (node.name === "this" && t.isReferenced(node, parent)) {
	        return t.thisExpression();
	      } else if (_esutils2.default.keyword.isIdentifierNameES6(node.name)) {
	        node.type = "Identifier";
	      } else {
	        return t.stringLiteral(node.name);
	      }
	    } else if (t.isJSXMemberExpression(node)) {
	      return t.memberExpression(convertJSXIdentifier(node.object, node), convertJSXIdentifier(node.property, node));
	    }

	    return node;
	  }