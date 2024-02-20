function arabicWordStartCheck(contextParams) {
	    var char = contextParams.current;
	    var prevChar = contextParams.get(-1);
	    return (
	        // ? arabic first char
	        (prevChar === null && isArabicChar(char)) ||
	        // ? arabic char preceded with a non arabic char
	        (!isArabicChar(prevChar) && isArabicChar(char))
	    );
	}