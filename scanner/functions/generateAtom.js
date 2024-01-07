function generateAtom(node) {
	    assertType(node.type, 'anchor|characterClass|characterClassEscape|dot|group|reference|value');

	    return generate(node);
	  }