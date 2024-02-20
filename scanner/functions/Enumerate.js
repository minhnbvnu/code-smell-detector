function Enumerate(value) {
	spec.Asn1Spec.call(this, new spec.Asn1Tag(spec.TagClass.Universal, spec.TagFormat.Primitive, UniversalTag.Enumerate));
	this.value = value || 0;
}