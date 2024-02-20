function synchronizeEvent(opt) {
	var self = {
		__INPUT_MESSAGE_TYPE__ : InputMessageType.INPUT_EVENT_SYNC,
		pad2Octets : new type.UInt16Le(),
        toggleFlags : new type.UInt32Le()	
	};
	
	return new type.Component(self, opt);
}