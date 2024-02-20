function LexerPushModeAction(mode) {
	LexerAction.call(this, LexerActionType.PUSH_MODE);
    this.mode = mode;
    return this;
}