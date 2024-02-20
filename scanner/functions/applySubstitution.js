function applySubstitution(action, tokens, index) {
	    if (action instanceof SubstitutionAction && SUBSTITUTIONS[action.id]) {
	        SUBSTITUTIONS[action.id](action, tokens, index);
	    }
	}