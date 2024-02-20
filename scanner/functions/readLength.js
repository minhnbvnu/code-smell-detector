function readLength(s) {
	var byte = new type.UInt8().read(s).value;
	var size = 0;
	if(byte & 0x80) {
		byte &= ~0x80;
		size = byte << 8;
		size += new type.UInt8().read(s).value;
	}
	else {
		size = byte;
	}
	return size;
}