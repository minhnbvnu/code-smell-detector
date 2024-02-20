function checkGlyphIndexStatus() {
	    if (this.tokenizer.registeredModifiers.indexOf('glyphIndex') === -1) {
	        throw new Error(
	            'glyphIndex modifier is required to apply ' +
	            'arabic presentation features.'
	        );
	    }
	}