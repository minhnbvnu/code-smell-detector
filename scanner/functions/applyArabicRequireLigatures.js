function applyArabicRequireLigatures() {
	    var this$1 = this;

	    var script = 'arab';
	    if (!this.featuresTags.hasOwnProperty(script)) { return; }
	    var tags = this.featuresTags[script];
	    if (tags.indexOf('rlig') === -1) { return; }
	    checkGlyphIndexStatus.call(this);
	    var ranges = this.tokenizer.getContextRanges('arabicWord');
	    ranges.forEach(function (range) {
	        arabicRequiredLigatures.call(this$1, range);
	    });
	}