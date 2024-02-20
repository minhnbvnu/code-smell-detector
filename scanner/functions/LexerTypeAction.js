function LexerTypeAction(type) {
	LexerAction.call(this, LexerActionType.TYPE);
	this.type = type;
	return this;
}