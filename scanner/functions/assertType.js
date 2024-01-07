function assertType(type, expected) {
	    if (expected.indexOf('|') == -1) {
	      if (type == expected) {
	        return;
	      }

	      throw Error('Invalid node type: ' + type);
	    }

	    expected = assertType.hasOwnProperty(expected) ? assertType[expected] : assertType[expected] = RegExp('^(?:' + expected + ')$');

	    if (expected.test(type)) {
	      return;
	    }

	    throw Error('Invalid node type: ' + type);
	  }