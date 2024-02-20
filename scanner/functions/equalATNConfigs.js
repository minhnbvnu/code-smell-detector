function equalATNConfigs(a, b) {
	if ( a===b ) {
		return true;
	}
	if ( a===null || b===null ) {
		return false;
	}
	return a.state.stateNumber===b.state.stateNumber &&
		a.alt===b.alt && a.semanticContext.equals(b.semanticContext);
}