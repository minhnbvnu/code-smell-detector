function errorInfoDataPDU(errorInfo, opt) {
	var self = {
		__PDUTYPE2__ : PDUType2.PDUTYPE2_SET_ERROR_INFO_PDU,
		errorInfo : new type.UInt32Le(errorInfo)
	};
	
	return new type.Component(self, opt);
}