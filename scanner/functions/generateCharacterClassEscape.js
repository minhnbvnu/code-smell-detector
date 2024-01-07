function generateCharacterClassEscape(node) {
	    assertType(node.type, 'characterClassEscape');

	    return '\\' + node.value;
	  }