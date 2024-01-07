function generateClassAtom(node) {
	    assertType(node.type, 'anchor|characterClassEscape|characterClassRange|dot|value');

	    return generate(node);
	  }