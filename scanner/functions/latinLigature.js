function latinLigature(range) {
	    var this$1 = this;

	    var script = 'latn';
	    var tokens = this.tokenizer.getRangeTokens(range);
	    var contextParams = getContextParams$1(tokens);
	    contextParams.context.forEach(function (glyphIndex, index) {
	        contextParams.setCurrentIndex(index);
	        var substitutions = this$1.query.lookupFeature({
	            tag: 'liga', script: script, contextParams: contextParams
	        });
	        if (substitutions.length) {
	            substitutions.forEach(
	                function (action) { return applySubstitution(action, tokens, index); }
	            );
	            contextParams = getContextParams$1(tokens);
	        }
	    });
	}