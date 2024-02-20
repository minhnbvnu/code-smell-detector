function Bidi(baseDir) {
	    this.baseDir = baseDir || 'ltr';
	    this.tokenizer = new Tokenizer();
	    this.featuresTags = {};
	}