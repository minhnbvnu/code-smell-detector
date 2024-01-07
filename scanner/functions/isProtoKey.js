function isProtoKey(node) {
	    return t.isLiteral(t.toComputedKey(node, node.key), { value: "__proto__" });
	  }