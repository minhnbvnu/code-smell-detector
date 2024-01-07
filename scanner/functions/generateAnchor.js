function generateAnchor(node) {
	    assertType(node.type, 'anchor');

	    switch (node.kind) {
	      case 'start':
	        return '^';
	      case 'end':
	        return '$';
	      case 'boundary':
	        return '\\b';
	      case 'not-boundary':
	        return '\\B';
	      default:
	        throw Error('Invalid assertion');
	    }
	  }