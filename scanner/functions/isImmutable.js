function isImmutable(node) {
	  if (t.isType(node.type, "Immutable")) return true;

	  if (t.isIdentifier(node)) {
	    if (node.name === "undefined") {
	      return true;
	    } else {
	      return false;
	    }
	  }

	  return false;
	}