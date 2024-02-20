function readList(listBeginType) {
	function matchesPeer(open, close) {
	    return open === 1/*OPEN_PAR*/ && close === 2/*CLOSE_PAR*/
	    	|| open === 3/*OPEN_BRACE*/ && close === 4/*CLOSE_BRACE*/
		|| open === 5/*OPEN_BRACKET*/ && close === 6/*CLOSE_BRACKET*/;
	};
	var res = null;

	while (true) {
	    var token = tokenizer.peekToken();
	    
	    switch (token.type) {
	    case 2/*CLOSE_PAR*/:
	    case 4/*CLOSE_BRACE*/:
	    case 6/*CLOSE_BRACKET*/:
		if (matchesPeer(listBeginType, token.type)) {
		    tokenizer.readToken(); // consume token
		    return sc_reverseBang(res);
		} else
		    throw "closing par doesn't match: " + listBeginType
			+ " " + listEndType;

	    case 0/*EOF*/:
		throw "unexpected end of file";

	    case 10/*DOT*/:
		tokenizer.readToken(); // consume token
		var cdr = this.read();
		var par = tokenizer.readToken();
		if (!matchesPeer(listBeginType, par.type))
		    throw "closing par doesn't match: " + listBeginType
			+ " " + par.type;
		else
		    return sc_reverseAppendBang(res, cdr);
		

	    default:
		res = sc_cons(this.read(), res);
	    }
	}
    }