function getAttributeValue(attr) {
	    var value = attr.value;
	    if (!value) return t.identifier("true");
	    if (t.isJSXExpressionContainer(value)) value = value.expression;
	    return value;
	  }