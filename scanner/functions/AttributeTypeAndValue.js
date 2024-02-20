function AttributeTypeAndValue() {
	return new asn1.univ.Sequence({
		type : AttributeType(),
		value : AttributeValue()
	});
}