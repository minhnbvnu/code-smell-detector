function controlDataPDU(action, opt) {
	var self = {
		__PDUTYPE2__ : PDUType2.PDUTYPE2_CONTROL,
		action : new type.UInt16Le(action),
	    grantId : new type.UInt16Le(),
	    controlId : new type.UInt32Le()	
	};
	
	return new type.Component(self, opt);
}