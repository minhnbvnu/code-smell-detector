function TerminalNodeImpl(symbol) {
	TerminalNode.call(this);
	this.parentCtx = null;
	this.symbol = symbol;
	return this;
}