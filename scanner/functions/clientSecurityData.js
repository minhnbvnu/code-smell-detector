function clientSecurityData(opt) {
	var self = {
		__TYPE__ : MessageType.CS_SECURITY,
		encryptionMethods : new type.UInt32Le(EncryptionMethod.ENCRYPTION_FLAG_40BIT | EncryptionMethod.ENCRYPTION_FLAG_56BIT | EncryptionMethod.ENCRYPTION_FLAG_128BIT),
		extEncryptionMethods : new type.UInt32Le()
	};
	
	return new type.Component(self, opt);
}