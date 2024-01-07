function createCharacter(matches) {
	      var _char = matches[0];
	      var first = _char.charCodeAt(0);
	      if (hasUnicodeFlag) {
	        var second;
	        if (_char.length === 1 && first >= 0xD800 && first <= 0xDBFF) {
	          second = lookahead().charCodeAt(0);
	          if (second >= 0xDC00 && second <= 0xDFFF) {
	            // Unicode surrogate pair
	            pos++;
	            return createValue('symbol', (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000, pos - 2, pos);
	          }
	        }
	      }
	      return createValue('symbol', first, pos - 1, pos);
	    }