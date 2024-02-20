function writePkcs1RSAPrivate(der, key) {
	var ver = Buffer.from([0]);
	der.writeBuffer(ver, asn1.Ber.Integer);

	der.writeBuffer(key.part.n.data, asn1.Ber.Integer);
	der.writeBuffer(key.part.e.data, asn1.Ber.Integer);
	der.writeBuffer(key.part.d.data, asn1.Ber.Integer);
	der.writeBuffer(key.part.p.data, asn1.Ber.Integer);
	der.writeBuffer(key.part.q.data, asn1.Ber.Integer);
	if (!key.part.dmodp || !key.part.dmodq)
		utils.addRSAMissing(key);
	der.writeBuffer(key.part.dmodp.data, asn1.Ber.Integer);
	der.writeBuffer(key.part.dmodq.data, asn1.Ber.Integer);
	der.writeBuffer(key.part.iqmp.data, asn1.Ber.Integer);
}