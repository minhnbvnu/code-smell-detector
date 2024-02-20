function LexerModeAction(mode) {
	LexerAction.call(this, LexerActionType.MODE);
    this.mode = mode;
    return this;
}