function generateGroup(node) {
	    assertType(node.type, 'group');

	    var result = '(';

	    switch (node.behavior) {
	      case 'normal':
	        break;
	      case 'ignore':
	        result += '?:';
	        break;
	      case 'lookahead':
	        result += '?=';
	        break;
	      case 'negativeLookahead':
	        result += '?!';
	        break;
	      default:
	        throw Error('Invalid behaviour: ' + node.behaviour);
	    }

	    var body = node.body,
	        length = body ? body.length : 0;

	    if (length == 1) {
	      result += generate(body[0]);
	    } else {
	      var i = -1;

	      while (++i < length) {
	        result += generate(body[i]);
	      }
	    }

	    result += ')';

	    return result;
	  }