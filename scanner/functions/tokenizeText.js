function tokenizeText() {
	    registerContextChecker.call(this, 'latinWord');
	    registerContextChecker.call(this, 'arabicWord');
	    registerContextChecker.call(this, 'arabicSentence');
	    return this.tokenizer.tokenize(this.text);
	}