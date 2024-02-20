function slowPathInputEvent(slowPathInputData, opt) {
	var self = {
		eventTime : new type.UInt32Le(),
        messageType : new type.UInt16Le(function() {
        	return self.slowPathInputData.obj.__INPUT_MESSAGE_TYPE__;
        }),
        slowPathInputData : slowPathInputData || new type.Factory(function(s) {
        	switch(self.messageType.value) {
        	case InputMessageType.INPUT_EVENT_SYNC:
        		self.slowPathInputData = synchronizeEvent().read(s);
        		break;
        	case InputMessageType.INPUT_EVENT_MOUSE:
        		self.slowPathInputData = pointerEvent().read(s);
        		break;
        	case InputMessageType.INPUT_EVENT_SCANCODE:
        		self.slowPathInputData = scancodeKeyEvent().read(s);
        		break;
        	case InputMessageType.INPUT_EVENT_UNICODE:
        		self.slowPathInputData = unicodeKeyEvent().read(s);
        		break;
        	default:
        		log.error('unknown slowPathInputEvent ' + self.messageType.value);
        	}
        })
	};
	
	return new type.Component(self, opt);
}