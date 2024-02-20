function writeLength(value) {
	if(value > 0x7f) {
		return new type.UInt16Be(value | 0x8000);
	}
	else {
		return new type.UInt8(value);
	}
}