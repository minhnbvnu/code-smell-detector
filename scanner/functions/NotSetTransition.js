function NotSetTransition(target, set) {
	SetTransition.call(this, target, set);
	this.serializationType = Transition.NOT_SET;
	return this;
}