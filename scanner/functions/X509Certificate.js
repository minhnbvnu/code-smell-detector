function X509Certificate() {
	return new asn1.univ.Sequence({
		tbsCertificate : TbsCertificate(),
		signatureAlgorithm : AlgorithmIdentifier(),
		signatureValue : new asn1.univ.BitString()
	});
}