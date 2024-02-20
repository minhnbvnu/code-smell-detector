function shutdownDeniedPDU(opt) {
	var self = {
		__PDUTYPE2__ : PDUType2.PDUTYPE2_SHUTDOWN_DENIED
	};
	
	return new type.Component(self, opt);
}