function parseUnicodeSurrogatePairEscape(firstEscape) {
	      if (hasUnicodeFlag) {
	        var first, second;
	        if (firstEscape.kind == 'unicodeEscape' && (first = firstEscape.codePoint) >= 0xD800 && first <= 0xDBFF && current('\\') && next('u')) {
	          var prevPos = pos;
	          pos++;
	          var secondEscape = parseClassEscape();
	          if (secondEscape.kind == 'unicodeEscape' && (second = secondEscape.codePoint) >= 0xDC00 && second <= 0xDFFF) {
	            // Unicode surrogate pair
	            firstEscape.range[1] = secondEscape.range[1];
	            firstEscape.codePoint = (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
	            firstEscape.type = 'value';
	            firstEscape.kind = 'unicodeCodePointEscape';
	            addRaw(firstEscape);
	          } else {
	            pos = prevPos;
	          }
	        }
	      }
	      return firstEscape;
	    }