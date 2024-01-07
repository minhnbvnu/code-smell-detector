function generateValue(node) {
	    assertType(node.type, 'value');

	    var kind = node.kind,
	        codePoint = node.codePoint;

	    switch (kind) {
	      case 'controlLetter':
	        return '\\c' + fromCodePoint(codePoint + 64);
	      case 'hexadecimalEscape':
	        return '\\x' + ('00' + codePoint.toString(16).toUpperCase()).slice(-2);
	      case 'identifier':
	        return '\\' + fromCodePoint(codePoint);
	      case 'null':
	        return '\\' + codePoint;
	      case 'octal':
	        return '\\' + codePoint.toString(8);
	      case 'singleEscape':
	        switch (codePoint) {
	          case 0x0008:
	            return '\\b';
	          case 0x009:
	            return '\\t';
	          case 0x00A:
	            return '\\n';
	          case 0x00B:
	            return '\\v';
	          case 0x00C:
	            return '\\f';
	          case 0x00D:
	            return '\\r';
	          default:
	            throw Error('Invalid codepoint: ' + codePoint);
	        }
	      case 'symbol':
	        return fromCodePoint(codePoint);
	      case 'unicodeEscape':
	        return '\\u' + ('0000' + codePoint.toString(16).toUpperCase()).slice(-4);
	      case 'unicodeCodePointEscape':
	        return '\\u{' + codePoint.toString(16).toUpperCase() + '}';
	      default:
	        throw Error('Unsupported node kind: ' + kind);
	    }
	  }