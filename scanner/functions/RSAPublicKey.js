function RSAPublicKey() {
	return new asn1.univ.Sequence({
		modulus : new asn1.univ.Integer(),
		publicExponent : new asn1.univ.Integer()
	});
}