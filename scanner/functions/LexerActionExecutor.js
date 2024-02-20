function LexerActionExecutor(lexerActions) {
	this.lexerActions = lexerActions === null ? [] : lexerActions;
	// Caches the result of {@link //hashCode} since the hash code is an element
	// of the performance-critical {@link LexerATNConfig//hashCode} operation.
	this.hashString = lexerActions.toString(); // "".join([str(la) for la in
	// lexerActions]))
	return this;
}