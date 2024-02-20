function synchronizeDataPDU(targetUser, opt) {
	var self = {
		__PDUTYPE2__ : PDUType2.PDUTYPE2_SYNCHRONIZE,
		messageType : new type.UInt16Le(1, { constant : true }),
	    targetUser : new type.UInt16Le(targetUser)	
	};
	
	return new type.Component(self, opt);
}