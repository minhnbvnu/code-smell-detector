function generateAlternative(node) {
	    assertType(node.type, 'alternative');

	    var terms = node.body,
	        length = terms ? terms.length : 0;

	    if (length == 1) {
	      return generateTerm(terms[0]);
	    } else {
	      var i = -1,
	          result = '';

	      while (++i < length) {
	        result += generateTerm(terms[i]);
	      }

	      return result;
	    }
	  }