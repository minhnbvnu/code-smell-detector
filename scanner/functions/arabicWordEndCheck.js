function arabicWordEndCheck(contextParams) {
	    var nextChar = contextParams.get(1);
	    return (
	        // ? last arabic char
	        (nextChar === null) ||
	        // ? next char is not arabic
	        (!isArabicChar(nextChar))
	    );
	}