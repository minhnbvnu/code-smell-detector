function TbsCertificate() {
	return new asn1.univ.Sequence({
		version : CertificateSerialNumber().explicitTag(new asn1.spec.Asn1Tag(asn1.spec.TagClass.Context, asn1.spec.TagFormat.Constructed, 0)),
		serialNumber : new asn1.univ.Integer(),
		signature : AlgorithmIdentifier(),
		issuer : Name(),
		validity : Validity(),
		subject : Name(),
		subjectPublicKeyInfo : SubjectPublicKeyInfo(),
		issuerUniqueID : UniqueIdentifier().implicitTag(asn1.spec.TagClass.Context, asn1.spec.TagFormat.Primitive, 1).optional(),
		subjectUniqueID : UniqueIdentifier().implicitTag(asn1.spec.TagClass.Context, asn1.spec.TagFormat.Primitive, 2).optional(),
		extensions : Extensions().implicitTag(asn1.spec.TagClass.Context, asn1.spec.TagFormat.Primitive, 3).optional()
	});
}