function PrecedencePredicateTransition(target, precedence) {
	AbstractPredicateTransition.call(this, target);
    this.serializationType = Transition.PRECEDENCE;
    this.precedence = precedence;
    this.isEpsilon = true;
    return this;
}