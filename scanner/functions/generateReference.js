function generateReference(node) {
	    assertType(node.type, 'reference');

	    return '\\' + node.matchIndex;
	  }