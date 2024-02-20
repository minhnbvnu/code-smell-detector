function fastPathUpdatePDU (updateData, opt) {
	var self = {
		updateHeader : new type.UInt8( function () {
			return self.updateData.obj.__FASTPATH_UPDATE_TYPE__;
		}),
		compressionFlags : new type.UInt8(null, { conditional : function () {
			return (self.updateHeader.value >> 4) & FastPathOutputCompression.FASTPATH_OUTPUT_COMPRESSION_USED;
		}}),
		size : new type.UInt16Le( function () {
			return self.updateData.size();
		}),
		updateData : updateData || new type.Factory( function (s) {
			var options = { readLength : new type.CallableValue( function () {
				return self.size.value;
			}) };
			
			switch (self.updateHeader.value & 0xf) {
			case FastPathUpdateType.FASTPATH_UPDATETYPE_BITMAP:
				self.updateData = fastPathBitmapUpdateDataPDU(options).read(s);
				break;
			default:
				self.updateData = new type.BinaryString(null, options).read(s);
				log.debug('unknown fast path pdu type ' + (self.updateHeader.value & 0xf));
			}
		})
	};
	
	return new type.Component(self, opt);
}