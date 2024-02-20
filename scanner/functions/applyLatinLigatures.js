function applyLatinLigatures() {
	    var this$1 = this;

	    var script = 'latn';
	    if (!this.featuresTags.hasOwnProperty(script)) { return; }
	    var tags = this.featuresTags[script];
	    if (tags.indexOf('liga') === -1) { return; }
	    checkGlyphIndexStatus.call(this);
	    var ranges = this.tokenizer.getContextRanges('latinWord');
	    ranges.forEach(function (range) {
	        latinLigature.call(this$1, range);
	    });
	}