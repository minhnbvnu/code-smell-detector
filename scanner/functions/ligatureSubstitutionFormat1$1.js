function ligatureSubstitutionFormat1$1(action, tokens, index) {
	    var token = tokens[index];
	    token.setState(action.tag, action.substitution.ligGlyph);
	    var compsCount = action.substitution.components.length;
	    for (var i = 0; i < compsCount; i++) {
	        token = tokens[index + i + 1];
	        token.setState('deleted', true);
	    }
	}