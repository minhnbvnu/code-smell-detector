function writeInteger16(value, minimum) {
	return new type.UInt16Be(value - (minimum || 0));
}