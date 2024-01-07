function generateDisjunction(node) {
	    assertType(node.type, 'disjunction');

	    var body = node.body,
	        length = body ? body.length : 0;

	    if (length == 0) {
	      throw Error('No body');
	    } else if (length == 1) {
	      return generate(body[0]);
	    } else {
	      var i = -1,
	          result = '';

	      while (++i < length) {
	        if (i != 0) {
	          result += '|';
	        }
	        result += generate(body[i]);
	      }

	      return result;
	    }
	  }