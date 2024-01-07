function convertAttribute(node) {
	    var value = convertAttributeValue(node.value || t.booleanLiteral(true));

	    if (t.isStringLiteral(value) && !t.isJSXExpressionContainer(node.value)) {
	      value.value = value.value.replace(/\n\s+/g, " ");
	    }

	    if (t.isValidIdentifier(node.name.name)) {
	      node.name.type = "Identifier";
	    } else {
	      node.name = t.stringLiteral(node.name.name);
	    }

	    return t.inherits(t.objectProperty(node.name, value), node);
	  }