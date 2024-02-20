function unicodeKeyEvent(opt) {
	var self = {
		__INPUT_MESSAGE_TYPE__ : InputMessageType.INPUT_EVENT_UNICODE,
		keyboardFlags : new type.UInt16Le(),
        unicode : new type.UInt16Le(),
        pad2Octets : new type.UInt16Le()
	};
	
	return new type.Component(self, opt);
}