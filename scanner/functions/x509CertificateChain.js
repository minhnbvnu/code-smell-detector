function x509CertificateChain() {
	var self = {
		__TYPE__ : CertificateType.CERT_CHAIN_VERSION_2,
		NumCertBlobs : new type.UInt32Le(),
        CertBlobArray : new type.Factory(function(s) {
        	self.CertBlobArray = new type.Component([]);
        	for(var i = 0; i < self.NumCertBlobs.value; i++) {
        		self.CertBlobArray.obj.push(certBlob().read(s));
        	}
        }),
        padding : new type.BinaryString(null, { readLength : new type.CallableValue(function() {
        	return 8 + 4 * self.NumCertBlobs.value;
        }) }),
        /**
         * @return {object} {n : modulus{bignum}, e : publicexponent{integer}
         */
        getPublicKey : function(){
        	var cert = x509.X509Certificate().decode(new type.Stream(self.CertBlobArray.obj[self.CertBlobArray.obj.length - 1].obj.abCert.value), asn1.ber);
        	var publikeyStream = new type.Stream(cert.value.tbsCertificate.value.subjectPublicKeyInfo.value.subjectPublicKey.toBuffer());
        	var asn1PublicKey = x509.RSAPublicKey().decode(publikeyStream, asn1.ber);
        	return rsa.publicKey(asn1PublicKey.value.modulus.value, asn1PublicKey.value.publicExponent.value);
        }
	};
	
	return new type.Component(self);
}