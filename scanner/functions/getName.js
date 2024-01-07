function getName(key) {
	  if (t.isIdentifier(key)) {
	    return key.name;
	  }
	  return key.value.toString();
	}