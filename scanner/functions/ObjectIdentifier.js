function ObjectIdentifier(value) {
	spec.Asn1Spec.call(this, new spec.Asn1Tag(spec.TagClass.Universal, spec.TagFormat.Primitive, UniversalTag.ObjectIdentifier));
	this.value = value || new Buffer(5);
}