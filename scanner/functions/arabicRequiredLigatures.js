function arabicRequiredLigatures(range) {
	    var this$1 = this;

	    var script = 'arab';
	    var tokens = this.tokenizer.getRangeTokens(range);
	    var contextParams = getContextParams(tokens);
	    contextParams.context.forEach(function (glyphIndex, index) {
	        contextParams.setCurrentIndex(index);
	        var substitutions = this$1.query.lookupFeature({
	            tag: 'rlig', script: script, contextParams: contextParams
	        });
	        if (substitutions.length) {
	            substitutions.forEach(
	                function (action) { return applySubstitution(action, tokens, index); }
	            );
	            contextParams = getContextParams(tokens);
	        }
	    });
	}