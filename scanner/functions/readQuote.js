function readQuote() {
	return sc_cons("quote", sc_cons(this.read(), null));
    }