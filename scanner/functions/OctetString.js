function OctetString(value) {
	spec.Asn1Spec.call(this, new spec.Asn1Tag(spec.TagClass.Universal, spec.TagFormat.Primitive, UniversalTag.OctetString));
	this.value = value || new Buffer(0);
}