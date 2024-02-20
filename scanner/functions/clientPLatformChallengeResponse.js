function clientPLatformChallengeResponse(opt) {
	var self = {
		__TYPE__ : MessageType.PLATFORM_CHALLENGE_RESPONSE,
		encryptedPlatformChallengeResponse : licenseBinaryBlob(BinaryBlobType.BB_DATA_BLOB),
        encryptedHWID : licenseBinaryBlob(BinaryBlobType.BB_DATA_BLOB),
        MACData : new type.BinaryString(new Buffer(Array(16 + 1).join('\x00'), 'binary'), { readLength : new type.CallableValue(16) })
	};
	
	return new type.Component(self, opt);
}