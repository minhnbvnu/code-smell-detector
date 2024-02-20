function arabicSentenceStartCheck(contextParams) {
	    var char = contextParams.current;
	    var prevChar = contextParams.get(-1);
	    return (
	        // ? an arabic char preceded with a non arabic char
	        (isArabicChar(char) || isTashkeelArabicChar(char)) &&
	        !isArabicChar(prevChar)
	    );
	}