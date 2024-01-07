function isValidIdentifier(name) {
	  if (typeof name !== "string" || _esutils2.default.keyword.isReservedWordES6(name, true)) {
	    return false;
	  } else if (name === "await") {
	    return false;
	  } else {
	    return _esutils2.default.keyword.isIdentifierNameES6(name);
	  }
	}