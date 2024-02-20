function pointerEvent(opt) {
	var self = {
		__INPUT_MESSAGE_TYPE__ : InputMessageType.INPUT_EVENT_MOUSE,
		pointerFlags : new type.UInt16Le(),
        xPos : new type.UInt16Le(),
        yPos : new type.UInt16Le()	
	};
	
	return new type.Component(self, opt);
}