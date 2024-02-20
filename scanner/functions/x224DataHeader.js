function x224DataHeader() {
	var self = {
		header : new type.UInt8(2),
		messageType : new type.UInt8(MessageType.X224_TPDU_DATA, { constant : true }),
		separator : new type.UInt8(0x80, { constant : true })	
	};
	return new type.Component(self);
}