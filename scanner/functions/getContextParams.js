function getContextParams(tokens, index) {
	    var context = tokens.map(function (token) { return token.activeState.value; });
	    return new ContextParams(context, index || 0);
	}