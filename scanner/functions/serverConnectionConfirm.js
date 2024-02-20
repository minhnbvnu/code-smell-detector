function serverConnectionConfirm(opt) {
	var self = {
		len : new type.UInt8(function() { 
			return new type.Component(self).size() - 1; 
		}),
		code : new type.UInt8(MessageType.X224_TPDU_CONNECTION_CONFIRM, { constant : true }),
		padding : new type.Component([new type.UInt16Le(), new type.UInt16Le(), new type.UInt8()]),
		protocolNeg : negotiation({ optional : true })
	};

	return new type.Component(self, opt);
}