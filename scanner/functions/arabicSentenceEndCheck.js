function arabicSentenceEndCheck(contextParams) {
	    var nextChar = contextParams.get(1);
	    switch (true) {
	        case nextChar === null:
	            return true;
	        case (!isArabicChar(nextChar) && !isTashkeelArabicChar(nextChar)):
	            var nextIsWhitespace = isWhiteSpace(nextChar);
	            if (!nextIsWhitespace) { return true; }
	            if (nextIsWhitespace) {
	                var arabicCharAhead = false;
	                arabicCharAhead = (
	                    contextParams.lookahead.some(
	                        function (c) { return isArabicChar(c) || isTashkeelArabicChar(c); }
	                    )
	                );
	                if (!arabicCharAhead) { return true; }
	            }
	            break;
	        default:
	            return false;
	    }
	}