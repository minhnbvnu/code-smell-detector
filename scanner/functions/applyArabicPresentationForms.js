function applyArabicPresentationForms() {
	    var this$1 = this;

	    var script = 'arab';
	    if (!this.featuresTags.hasOwnProperty(script)) { return; }
	    checkGlyphIndexStatus.call(this);
	    var ranges = this.tokenizer.getContextRanges('arabicWord');
	    ranges.forEach(function (range) {
	        arabicPresentationForms.call(this$1, range);
	    });
	}