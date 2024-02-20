function latinWordEndCheck(contextParams) {
	    var nextChar = contextParams.get(1);
	    return (
	        // ? last latin char
	        (nextChar === null) ||
	        // ? next char is not latin
	        (!isLatinChar(nextChar))
	    );
	}