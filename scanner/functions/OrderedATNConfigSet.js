function OrderedATNConfigSet() {
	ATNConfigSet.call(this);
	this.configLookup = new Set();
	return this;
}