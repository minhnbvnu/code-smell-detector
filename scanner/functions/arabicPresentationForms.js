function arabicPresentationForms(range) {
	    var this$1 = this;

	    var script = 'arab';
	    var tags = this.featuresTags[script];
	    var tokens = this.tokenizer.getRangeTokens(range);
	    if (tokens.length === 1) { return; }
	    var contextParams = new ContextParams(
	        tokens.map(function (token) { return token.getState('glyphIndex'); }
	    ), 0);
	    var charContextParams = new ContextParams(
	        tokens.map(function (token) { return token.char; }
	    ), 0);
	    tokens.forEach(function (token, index) {
	        if (isTashkeelArabicChar(token.char)) { return; }
	        contextParams.setCurrentIndex(index);
	        charContextParams.setCurrentIndex(index);
	        var CONNECT = 0; // 2 bits 00 (10: can connect next) (01: can connect prev)
	        if (willConnectPrev(charContextParams)) { CONNECT |= 1; }
	        if (willConnectNext(charContextParams)) { CONNECT |= 2; }
	        var tag;
	        switch (CONNECT) {
	            case 1: (tag = 'fina'); break;
	            case 2: (tag = 'init'); break;
	            case 3: (tag = 'medi'); break;
	        }
	        if (tags.indexOf(tag) === -1) { return; }
	        var substitutions = this$1.query.lookupFeature({
	            tag: tag, script: script, contextParams: contextParams
	        });
	        if (substitutions instanceof Error) { return console.info(substitutions.message); }
	        substitutions.forEach(function (action, index) {
	            if (action instanceof SubstitutionAction) {
	                applySubstitution(action, tokens, index);
	                contextParams.context[index] = action.substitution;
	            }
	        });
	    });
	}