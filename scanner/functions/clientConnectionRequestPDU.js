function clientConnectionRequestPDU(opt, cookie) {
	var self = {
		len : new type.UInt8(function() { 
			return new type.Component(self).size() - 1; 
		}),
		code : new type.UInt8(MessageType.X224_TPDU_CONNECTION_REQUEST, { constant : true }),
		padding : new type.Component([new type.UInt16Le(), new type.UInt16Le(), new type.UInt8()]),
		cookie : cookie || new type.Factory( function (s) {
			var offset = 0;
			while (true) {
				var token = s.buffer.readUInt16LE(s.offset + offset);
				if (token === 0x0a0d) {
					self.cookie = new type.BinaryString(null, { readLength : new type.CallableValue(offset + 2) }).read(s);
					return;
				}
				else {
					offset += 1;
				}
			}
		}, { conditional : function () {
			return self.len.value > 14;
		}}),
		protocolNeg : negotiation({ optional : true })
	};

	return new type.Component(self, opt);
}