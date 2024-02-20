function deactiveAllPDU(opt) {
	var self = {
		__PDUTYPE__ : PDUType.PDUTYPE_DEACTIVATEALLPDU,
		shareId : new type.UInt32Le(),
        lengthSourceDescriptor : new type.UInt16Le(function() {
        	return self.sourceDescriptor.size();
        }),
        sourceDescriptor : new type.BinaryString(new Buffer('rdpy', 'binary'), { readLength : new type.CallableValue(function() {
        	self.lengthSourceDescriptor 
        }) })
	};
	
	return new type.Component(self, opt);
}