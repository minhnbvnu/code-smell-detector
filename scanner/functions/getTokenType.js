function getTokenType(match) {
	  var _match$slice = match.slice(-2),
	      offset = _match$slice[0],
	      text = _match$slice[1];

	  var token = (0, _jsTokens.matchToToken)(match);

	  if (token.type === "name") {
	    if (_esutils2.default.keyword.isReservedWordES6(token.value)) {
	      return "keyword";
	    }

	    if (JSX_TAG.test(token.value) && (text[offset - 1] === "<" || text.substr(offset - 2, 2) == "</")) {
	      return "jsx_tag";
	    }

	    if (token.value[0] !== token.value[0].toLowerCase()) {
	      return "capitalized";
	    }
	  }

	  if (token.type === "punctuator" && BRACKET.test(token.value)) {
	    return "bracket";
	  }

	  return token.type;
	}