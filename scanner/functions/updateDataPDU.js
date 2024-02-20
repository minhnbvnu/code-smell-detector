function updateDataPDU(updateData, opt) {
	var self = {
		__PDUTYPE2_ : PDUType2.PDUTYPE2_UPDATE__,
		updateType : new type.UInt16Le(function() {
			return self.updateData.obj.__UPDATE_TYPE__;
		}),
		updateData : updateData || new type.Factory(function(s) {
			var options =  { readLength : new type.CallableValue(function() {
				return opt.readLength.value - 2;
			})};
			switch(self.updateType.value) {
			case UpdateType.UPDATETYPE_BITMAP:
				self.updateData = bitmapUpdateDataPDU(null, options).read(s);
				break;
			case UpdateType.UPDATETYPE_SYNCHRONIZE:
				// do nothing artefact of protocol
				self.updateData = synchronizeUpdateDataPDU(null, options).read(s);
				break;
			default:
				self.updateData = new type.BinaryString(null, options).read(s);
				log.debug('unknown updateDataPDU ' + self.updateType.value);
			}
		})
	};
	
	return new type.Component(self, opt);
}