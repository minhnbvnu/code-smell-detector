function ConnectInitial (userData) {
	return new asn1.univ.Sequence({
		callingDomainSelector : new asn1.univ.OctetString(new Buffer('\x01', 'binary')),
		calledDomainSelector : new asn1.univ.OctetString(new Buffer('\x01', 'binary')),
		upwardFlag : new asn1.univ.Boolean(true),
		targetParameters : DomainParameters(34, 2, 0, 1, 0, 1, 0xffff, 2),
		minimumParameters : DomainParameters(1, 1, 1, 1, 0, 1, 0x420, 2),
		maximumParameters : DomainParameters(0xffff, 0xfc17, 0xffff, 1, 0, 1, 0xffff, 2),
		userData : new asn1.univ.OctetString(userData)
	}).implicitTag(new asn1.spec.Asn1Tag(asn1.spec.TagClass.Application, asn1.spec.TagFormat.Constructed, 101));
}