function scancodeKeyEvent(opt) {
	var self = {
		__INPUT_MESSAGE_TYPE__ : InputMessageType.INPUT_EVENT_SCANCODE,
		keyboardFlags : new type.UInt16Le(),
        keyCode : new type.UInt16Le(),
        pad2Octets : new type.UInt16Le()	
	};
	
	return new type.Component(self, opt);
}