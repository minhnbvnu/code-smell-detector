function serverSecurityData(opt) {
	var self = {
		__TYPE__ : MessageType.SC_SECURITY,
		encryptionMethod : new type.UInt32Le(),
		encryptionLevel : new type.UInt32Le() 
	};
	
	return new type.Component(self, opt);
}