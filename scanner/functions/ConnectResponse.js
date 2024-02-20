function ConnectResponse (userData) {
	return new asn1.univ.Sequence({
		result : new asn1.univ.Enumerate(0),
		calledConnectId : new asn1.univ.Integer(0),
		domainParameters : DomainParameters(22, 3, 0, 1, 0, 1,0xfff8, 2),
		userData : new asn1.univ.OctetString(userData)
	}).implicitTag(new asn1.spec.Asn1Tag(asn1.spec.TagClass.Application, asn1.spec.TagFormat.Constructed, 102));
}