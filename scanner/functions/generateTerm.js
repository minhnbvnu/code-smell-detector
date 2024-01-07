function generateTerm(node) {
	    assertType(node.type, 'anchor|characterClass|characterClassEscape|empty|group|quantifier|reference|value');

	    return generate(node);
	  }