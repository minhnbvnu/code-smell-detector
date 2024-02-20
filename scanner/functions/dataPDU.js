function dataPDU(pduData, shareId, opt) {
	var self = {
		__PDUTYPE__ : PDUType.PDUTYPE_DATAPDU,
		shareDataHeader : shareDataHeader(new type.CallableValue(function() {
			return new type.Component(self).size();
		}), function() {
			return self.pduData.obj.__PDUTYPE2__;
		}, shareId),
		pduData : pduData || new type.Factory(function(s) {
			
			//compute local readLength
			var options = { readLength : new type.CallableValue(function() {
				return opt.readLength.value - self.shareDataHeader.size();
			}) };
			
			switch(self.shareDataHeader.obj.pduType2.value) {
			case PDUType2.PDUTYPE2_SYNCHRONIZE:
				self.pduData = synchronizeDataPDU(null, options).read(s)
				break;
			case PDUType2.PDUTYPE2_CONTROL:
				self.pduData = controlDataPDU(null, options).read(s);
				break;
			case PDUType2.PDUTYPE2_SET_ERROR_INFO_PDU:
				self.pduData = errorInfoDataPDU(null, options).read(s);
				break;
			case PDUType2.PDUTYPE2_FONTLIST:
				self.pduData = fontListDataPDU(options).read(s);
				break;
			case PDUType2.PDUTYPE2_FONTMAP:
				self.pduData = fontMapDataPDU(options).read(s);
				break;
			case PDUType2.PDUTYPE2_BITMAPCACHE_PERSISTENT_LIST:
				self.pduData = persistentListPDU(null, options).read(s);
				break;
			case PDUType2.PDUTYPE2_INPUT:
				self.pduData = clientInputEventPDU(null, options).read(s);
				break;
			case PDUType2.PDUTYPE2_SHUTDOWN_REQUEST:
				self.pduData = shutdownRequestPDU(options).read(s);
				break;
			case PDUType2.PDUTYPE2_SHUTDOWN_DENIED:
				self.pduData = shutdownDeniedPDU(options).read(s);
				break;
			case PDUType2.PDUTYPE2_SUPPRESS_OUTPUT:
				self.pduData = supressOutputDataPDU(options).read(s);
				break;
			case PDUType2.PDUTYPE2_REFRESH_RECT:
				self.pduData = refreshRectPDU(null, options).read(s);
				break;
			case PDUType2.PDUTYPE2_UPDATE:
				self.pduData = updateDataPDU(null, options).read(s);
				break;
			default:
				self.pduData = new type.BinaryString(null, options).read(s);
				log.debug('unknown PDUType2 ' + self.shareDataHeader.obj.pduType2.value);
			}
		})
	};
	
	return new type.Component(self, opt);
}