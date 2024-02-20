function DecisionState() {
	ATNState.call(this);
    this.decision = -1;
    this.nonGreedy = false;
    return this;
}