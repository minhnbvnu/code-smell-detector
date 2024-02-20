function RuleStartState() {
	ATNState.call(this);
	this.stateType = ATNState.RULE_START;
	this.stopState = null;
	this.isPrecedenceRule = false;
	return this;
}