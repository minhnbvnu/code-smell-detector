function LoopEndState() {
	ATNState.call(this);
	this.stateType = ATNState.LOOP_END;
	this.loopBackState = null;
	return this;
}