function encodeLength(length) {
	if(length > 0x7f) {
        return new type.Component([new type.UInt8(0x82), new type.UInt16Be(length)]);
    }
    else {
        return new type.UInt8(length);
    }
}