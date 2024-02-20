function serverLicenseRequest(opt) {
	var self = {
		__TYPE__ : MessageType.LICENSE_REQUEST,
		serverRandom : new type.BinaryString(new Buffer(Array(32 + 1).join('\x00')), { readLength : new type.CallableValue(32) } ),
        productInfo : productInformation(),
        keyExchangeList : licenseBinaryBlob(BinaryBlobType.BB_KEY_EXCHG_ALG_BLOB),
        serverCertificate : licenseBinaryBlob(BinaryBlobType.BB_CERTIFICATE_BLOB),
        scopeList : scopeList()
	};
	
	return new type.Component(self, opt);
}