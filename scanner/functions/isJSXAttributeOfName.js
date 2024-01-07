function isJSXAttributeOfName(attr, name) {
	    return t.isJSXAttribute(attr) && t.isJSXIdentifier(attr.name, { name: name });
	  }