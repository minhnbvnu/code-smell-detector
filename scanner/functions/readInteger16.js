function readInteger16(s, minimum) {
	return new type.UInt16Be().read(s).value + (minimum || 0);
}