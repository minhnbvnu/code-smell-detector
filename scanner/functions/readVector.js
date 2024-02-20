function readVector() {
	// opening-parenthesis is already consumed
	var a = new Array();
	while (true) {
	    var token = tokenizer.peekToken();
	    switch (token.type) {
	    case 2/*CLOSE_PAR*/:
		tokenizer.readToken();
		return a;
		
	    default:
		a.push(this.read());
	    }
	}
    }