function proprietaryCertificate() {
	var self = {
		__TYPE__ : CertificateType.CERT_CHAIN_VERSION_1,
		dwSigAlgId : new type.UInt32Le(0x00000001, { constant : true }),
        dwKeyAlgId : new type.UInt32Le(0x00000001, { constant : true }),
        wPublicKeyBlobType : new type.UInt16Le(0x0006, { constant : true }),
        wPublicKeyBlobLen : new type.UInt16Le(function() {
        	return self.PublicKeyBlob.size();
        }),
        PublicKeyBlob : rsaPublicKey({ readLength : new type.CallableValue(function() {
        	return self.wPublicKeyBlobLen.value;
        }) }),
        wSignatureBlobType : new type.UInt16Le(0x0008, { constant : true }),
        wSignatureBlobLen : new type.UInt16Le(function() {
        	return self.SignatureBlob.size() + self.padding.size();
        }),
        SignatureBlob : new type.BinaryString(null, { readLength : new type.CallableValue(function() {
        	return self.wSignatureBlobLen.value - self.padding.size;
        }) }),
        padding : new type.BinaryString(Array(8 + 1).join('\x00'), { readLength : new type.CallableValue(8) }),
        /**
         * @return {object} rsa.publicKey
         */
        getPublicKey : function() {
        	return rsa.publicKey(self.PublicKeyBlob.obj.modulus.value, self.PublicKeyBlob.obj.pubExp.value);
        }
	};
	
	return new type.Component(self);
}