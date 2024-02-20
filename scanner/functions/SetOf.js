function SetOf(factory, value) {
	// not tagged type
	spec.Asn1Spec.call(this, new spec.Asn1Tag(spec.TagClass.Universal, spec.TagFormat.Constructed, UniversalTag.Set));
	this.factory = factory;
	this.value = value || [];
}