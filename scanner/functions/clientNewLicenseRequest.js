function clientNewLicenseRequest(opt) {
	var self = {
		__TYPE__ : MessageType.NEW_LICENSE_REQUEST,
		preferredKeyExchangeAlg : new type.UInt32Le(0x00000001, { constant : true }),
        // pure microsoft client ;-)
        // http://msdn.microsoft.com/en-us/library/1040af38-c733-4fb3-acd1-8db8cc979eda#id10
        platformId : new type.UInt32Le(0x04000000 | 0x00010000),
        clientRandom : new type.BinaryString(new Buffer(Array(32 + 1).join('\x00')), { readLength : new type.CallableValue(32) }),
        encryptedPreMasterSecret : licenseBinaryBlob(BinaryBlobType.BB_RANDOM_BLOB),
        ClientUserName : licenseBinaryBlob(BinaryBlobType.BB_CLIENT_USER_NAME_BLOB),
        ClientMachineName : licenseBinaryBlob(BinaryBlobType.BB_CLIENT_MACHINE_NAME_BLOB)
	};
	
	return new type.Component(self, opt);
}