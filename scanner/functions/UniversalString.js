function UniversalString(value) {
	spec.Asn1Spec.call(this, new spec.Asn1Tag(spec.TagClass.Universal, spec.TagFormat.Primitive, UniversalTag.UniversalString));
	this.value = value;
}