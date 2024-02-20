function GeneralizedTime(value) {
	spec.Asn1Spec.call(this, new spec.Asn1Tag(spec.TagClass.Universal, spec.TagFormat.Primitive, UniversalTag.GeneralizedTime));
	this.value = value;
}