function findCommonStringDelimiter(code, tokens) {
	  var DEFAULT_STRING_DELIMITER = "double";
	  if (!code) {
	    return DEFAULT_STRING_DELIMITER;
	  }

	  var occurrences = {
	    single: 0,
	    double: 0
	  };

	  var checked = 0;

	  for (var i = 0; i < tokens.length; i++) {
	    var token = tokens[i];
	    if (token.type.label !== "string") continue;

	    var raw = code.slice(token.start, token.end);
	    if (raw[0] === "'") {
	      occurrences.single++;
	    } else {
	      occurrences.double++;
	    }

	    checked++;
	    if (checked >= 3) break;
	  }
	  if (occurrences.single > occurrences.double) {
	    return "single";
	  } else {
	    return "double";
	  }
	}