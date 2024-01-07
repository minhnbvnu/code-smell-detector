function getQualifiedJSXName(object) {
	  if (object.type === "JSXIdentifier") {
	    return object.name;
	  }

	  if (object.type === "JSXNamespacedName") {
	    return object.namespace.name + ":" + object.name.name;
	  }

	  if (object.type === "JSXMemberExpression") {
	    return getQualifiedJSXName(object.object) + "." + getQualifiedJSXName(object.property);
	  }
	}