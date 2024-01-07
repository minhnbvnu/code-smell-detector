function generateCharacterClassRange(node) {
	    assertType(node.type, 'characterClassRange');

	    var min = node.min,
	        max = node.max;

	    if (min.type == 'characterClassRange' || max.type == 'characterClassRange') {
	      throw Error('Invalid character class range');
	    }

	    return generateClassAtom(min) + '-' + generateClassAtom(max);
	  }