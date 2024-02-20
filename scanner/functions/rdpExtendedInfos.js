function rdpExtendedInfos(opt) {
	var self = {
		clientAddressFamily : new type.UInt16Le(AfInet.AfInet),
	    cbClientAddress : new type.UInt16Le(function() {
        	return self.clientAddress.size();
        }),
	    clientAddress : new type.BinaryString(new Buffer('\x00', 'ucs2'),{ readLength : new type.CallableValue(function() {
	    	return self.cbClientAddress;
	    }) }),
	    cbClientDir : new type.UInt16Le(function() {
        	return self.clientDir.size();
        }),
	    clientDir : new type.BinaryString(new Buffer('\x00', 'ucs2'), { readLength : new type.CallableValue(function() {
	    	return self.cbClientDir;
	    }) }),
	    clientTimeZone : new type.BinaryString(new Buffer(Array(172 + 1).join("\x00"))),
	    clientSessionId : new type.UInt32Le(),
	    performanceFlags : new type.UInt32Le()
	};
	return new type.Component(self, opt);
}