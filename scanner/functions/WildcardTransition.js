function WildcardTransition(target) {
	Transition.call(this, target);
	this.serializationType = Transition.WILDCARD;
	return this;
}