function generateQuantifier(node) {
	    assertType(node.type, 'quantifier');

	    var quantifier = '',
	        min = node.min,
	        max = node.max;

	    switch (max) {
	      case undefined:
	      case null:
	        switch (min) {
	          case 0:
	            quantifier = '*';
	            break;
	          case 1:
	            quantifier = '+';
	            break;
	          default:
	            quantifier = '{' + min + ',}';
	            break;
	        }
	        break;
	      default:
	        if (min == max) {
	          quantifier = '{' + min + '}';
	        } else if (min == 0 && max == 1) {
	          quantifier = '?';
	        } else {
	          quantifier = '{' + min + ',' + max + '}';
	        }
	        break;
	    }

	    if (!node.greedy) {
	      quantifier += '?';
	    }

	    return generateAtom(node.body[0]) + quantifier;
	  }