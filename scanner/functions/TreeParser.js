function TreeParser(contentHandler, lexicalHandler){
	this.contentHandler;
	this.lexicalHandler;
	this.locatorDelegate;

	if (!contentHandler) {
		throw new IllegalArgumentException("contentHandler was null.");
	}
	this.contentHandler = contentHandler;
	if (!lexicalHandler) {
		this.lexicalHandler = new NullLexicalHandler();
	} else {
		this.lexicalHandler = lexicalHandler;
	}
}