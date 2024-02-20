function shutdownRequestPDU(opt) {
	var self = {
		__PDUTYPE2__ : PDUType2.PDUTYPE2_SHUTDOWN_REQUEST
	};
	
	return new type.Component(self, opt);
}