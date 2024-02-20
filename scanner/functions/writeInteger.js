function writeInteger(value) {
	if(value <= 0xff) {
		return new type.Component([writeLength(1), new type.UInt8(value)]);
	}
	else if(value < 0xffff) {
		return new type.Component([writeLength(2), new type.UInt16Be(value)]);
	}
	else {
		return new type.Component([writeLength(4), new type.UInt32Be(value)]);
	}
}