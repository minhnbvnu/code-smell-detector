function Sequence(value) {
	spec.Asn1Spec.call(this, new spec.Asn1Tag(spec.TagClass.Universal, spec.TagFormat.Constructed, UniversalTag.Sequence));
	this.value = value || [];
}