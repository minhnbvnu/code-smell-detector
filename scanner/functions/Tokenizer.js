function Tokenizer(options, input) {
	    classCallCheck(this, Tokenizer);

	    this.state = new State();
	    this.state.init(options, input);
	  }