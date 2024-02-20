function writePkcs1ECDSAPrivate(der, key) {
	var ver = Buffer.from([1]);
	der.writeBuffer(ver, asn1.Ber.Integer);

	der.writeBuffer(key.part.d.data, asn1.Ber.OctetString);

	der.startSequence(0xa0);
	var curve = key.part.curve.data.toString();
	var curveOid = algs.curves[curve].pkcs8oid;
	assert.string(curveOid, 'a known ECDSA named curve');
	der.writeOID(curveOid);
	der.endSequence();

	der.startSequence(0xa1);
	var Q = utils.ecNormalize(key.part.Q.data, true);
	der.writeBuffer(Q, asn1.Ber.BitString);
	der.endSequence();
}