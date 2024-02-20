function serverPlatformChallenge(opt) {
	var self = {
		__TYPE__ : MessageType.PLATFORM_CHALLENGE,
		connectFlags : new type.UInt32Le(),
        encryptedPlatformChallenge : licenseBinaryBlob(BinaryBlobType.BB_ANY_BLOB),
        MACData : new type.BinaryString(new Buffer(Array(16 + 1).join('\x00')), { readLength : new type.CallableValue(16) })
	};
	
	return new type.Component(self, opt);
}