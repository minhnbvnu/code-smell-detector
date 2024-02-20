function latinWordStartCheck(contextParams) {
	    var char = contextParams.current;
	    var prevChar = contextParams.get(-1);
	    return (
	        // ? latin first char
	        (prevChar === null && isLatinChar(char)) ||
	        // ? latin char preceded with a non latin char
	        (!isLatinChar(prevChar) && isLatinChar(char))
	    );
	}