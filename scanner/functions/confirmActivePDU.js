function confirmActivePDU(capabilities, shareId, opt) {
	var self = {
		__PDUTYPE__ : PDUType.PDUTYPE_CONFIRMACTIVEPDU,
		shareId : new type.UInt32Le(shareId),
        originatorId : new type.UInt16Le(0x03EA, { constant : true }),
        lengthSourceDescriptor : new type.UInt16Le(function() {
        	return self.sourceDescriptor.size();
        }),
        lengthCombinedCapabilities : new type.UInt16Le(function() {
        	return self.numberCapabilities.size() + self.pad2Octets.size() + self.capabilitySets.size();
        }),
        sourceDescriptor : new type.BinaryString(new Buffer('rdpy', 'binary'), { readLength : new type.CallableValue(function() {
        	return self.lengthSourceDescriptor.value
        }) }),
        numberCapabilities : new type.UInt16Le(function() {
        	return self.capabilitySets.obj.length;
        }),
        pad2Octets : new type.UInt16Le(),
        capabilitySets : capabilities || new type.Factory(function(s) {
        	self.capabilitySets = new type.Component([]);
        	for(var i = 0; i < self.numberCapabilities.value; i++) {
        		self.capabilitySets.obj.push(caps.capability().read(s))
        	}
        })
	};
	
	return new type.Component(self, opt);
}