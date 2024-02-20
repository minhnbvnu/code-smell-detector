function AlgorithmIdentifier() {
	return new asn1.univ.Sequence({
		algorithm : new asn1.univ.ObjectIdentifier(),
		parameters : new asn1.univ.Null()
	});
}