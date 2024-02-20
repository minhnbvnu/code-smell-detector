function LexerSkipAction() {
	LexerAction.call(this, LexerActionType.SKIP);
	return this;
}