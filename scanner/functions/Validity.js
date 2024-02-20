function Validity() {
	return new asn1.univ.Sequence({
		notBefore : Time(),
		notAfter : Time()
	});
}