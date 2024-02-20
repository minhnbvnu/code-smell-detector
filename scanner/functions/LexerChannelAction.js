function LexerChannelAction(channel) {
	LexerAction.call(this, LexerActionType.CHANNEL);
    this.channel = channel;
    return this;
}