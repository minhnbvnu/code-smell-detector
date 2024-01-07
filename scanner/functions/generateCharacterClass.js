function generateCharacterClass(node) {
	    assertType(node.type, 'characterClass');

	    var classRanges = node.body,
	        length = classRanges ? classRanges.length : 0;

	    var i = -1,
	        result = '[';

	    if (node.negative) {
	      result += '^';
	    }

	    while (++i < length) {
	      result += generateClassAtom(classRanges[i]);
	    }

	    result += ']';

	    return result;
	  }