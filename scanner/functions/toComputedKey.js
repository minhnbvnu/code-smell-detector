function toComputedKey(node) {
	  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : node.key || node.property;

	  if (!node.computed) {
	    if (t.isIdentifier(key)) key = t.stringLiteral(key.name);
	  }
	  return key;
	}