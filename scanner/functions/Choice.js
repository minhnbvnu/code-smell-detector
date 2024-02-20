function Choice(value) {
	// not tagged type
	spec.Asn1Spec.call(this, new spec.Asn1Tag());
	this.value = value;
}