function pdu(userId, pduMessage, opt) {
	var self = {
		shareControlHeader : shareControlHeader(function() {
			return new type.Component(self).size();
		}, function() {
			return pduMessage.obj.__PDUTYPE__;
		}, userId),
		pduMessage : pduMessage || new type.Factory(function(s) {
			
			// compute local common options
			var options = { readLength : new type.CallableValue(function() {
				return self.shareControlHeader.obj.totalLength.value - self.shareControlHeader.size();
			}) };
			
			switch(self.shareControlHeader.obj.pduType.value) {
			case PDUType.PDUTYPE_DEMANDACTIVEPDU:
				self.pduMessage = demandActivePDU(null, options).read(s);
				break;
			case PDUType.PDUTYPE_CONFIRMACTIVEPDU:
				self.pduMessage = confirmActivePDU(null, options).read(s);
				break;
			case PDUType.PDUTYPE_DEACTIVATEALLPDU:
				self.pduMessage = deactiveAllPDU(options).read(s);
				break;
			case PDUType.PDUTYPE_DATAPDU:
				self.pduMessage = dataPDU(null, null, options).read(s);
				break;
			default:
				self.pduMessage = new type.BinaryString(null, options).read(s);
				log.debug('unknown pdu type ' + self.shareControlHeader.obj.pduType.value);
			}
		})
	};
	
	return new type.Component(self, opt);
}