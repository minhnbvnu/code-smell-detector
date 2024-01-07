function toKind(node) {
	  if (t.isClassMethod(node) || t.isObjectMethod(node)) {
	    if (node.kind === "get" || node.kind === "set") {
	      return node.kind;
	    }
	  }

	  return "value";
	}