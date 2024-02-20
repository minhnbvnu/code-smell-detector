function licensePacket(message) {
	var self = {
		bMsgtype : new type.UInt8(function() {
			return self.licensingMessage.obj.__TYPE__;
		}),
        flag : new type.UInt8(Preambule.PREAMBLE_VERSION_3_0),
        wMsgSize : new type.UInt16Le(function() {
        	return new type.Component(self).size();
        }),
        licensingMessage : message || new type.Factory(function(s) {
        	switch(self.bMsgtype.value) {
        	case MessageType.ERROR_ALERT:
        		self.licensingMessage = licensingErrorMessage({ readLength : new type.CallableValue(function() {
        			return self.wMsgSize.value - 4;
        		})}).read(s);
        		break;
        	case MessageType.LICENSE_REQUEST:
        		self.licensingMessage = serverLicenseRequest({ readLength : new type.CallableValue(function() {
        			return self.wMsgSize.value - 4;
        		})}).read(s);
        		break;
        	case MessageType.NEW_LICENSE_REQUEST:
        		self.licensingMessage = clientNewLicenseRequest({ readLength : new type.CallableValue(function() {
        			return self.wMsgSize.value - 4;
        		})}).read(s);
        		break;
        	case MessageType.PLATFORM_CHALLENGE:
        		self.licensingMessage = serverPlatformChallenge({ readLength : new type.CallableValue(function() {
        			return self.wMsgSize.value - 4;
        		})}).read(s);
        		break;
        	case MessageType.PLATFORM_CHALLENGE_RESPONSE:
        		self.licensingMessage = clientPLatformChallengeResponse({ readLength : new type.CallableValue(function() {
        			return self.wMsgSize.value - 4;
        		})}).read(s);
        		break;
        	default:
        		log.error('unknown license message type ' + self.bMsgtype.value);
        	}
        })
	};
	
	return new type.Component(self);
}