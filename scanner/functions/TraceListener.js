function TraceListener(parser) {
	ParseTreeListener.call(this);
    this.parser = parser;
	return this;
}