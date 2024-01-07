function KeywordTokenType(name) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    classCallCheck(this, KeywordTokenType);

	    options.keyword = name;

	    return possibleConstructorReturn(this, _TokenType.call(this, name, options));
	  }