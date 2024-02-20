function Extension() {
	return new asn1.univ.Sequence({
		extnID : new asn1.univ.ObjectIdentifier(),
		critical : new asn1.univ.Boolean(),
		extnValue : new asn1.univ.OctetString()
	});
}