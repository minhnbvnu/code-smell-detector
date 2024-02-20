function EpsilonTransition(target, outermostPrecedenceReturn) {
	Transition.call(this, target);
    this.serializationType = Transition.EPSILON;
    this.isEpsilon = true;
    this.outermostPrecedenceReturn = outermostPrecedenceReturn;
    return this;
}