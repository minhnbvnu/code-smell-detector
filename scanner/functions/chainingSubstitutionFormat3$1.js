function chainingSubstitutionFormat3$1(action, tokens, index) {
	    action.substitution.forEach(function (subst, offset) {
	        var token = tokens[index + offset];
	        token.setState(action.tag, subst);
	    });
	}