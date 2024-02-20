function SubjectPublicKeyInfo() {
	return new asn1.univ.Sequence({
		algorithm : AlgorithmIdentifier(),
		subjectPublicKey : new asn1.univ.BitString()
	});
}