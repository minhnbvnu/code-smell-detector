function decodeLength(s) {
	var size = new type.UInt8().read(s).value;
	if(size & 0x80) {
		size &= ~0x80;
		if(size === 1) {
			size = new type.UInt8().read(s).value;
		}
		else if(size === 2) {
			size = new type.UInt16Be().read(s).value;
		}
		else{
			throw new error.ProtocolError('NODE_RDP_ASN1_BER_INVALID_LENGTH');
		}
	}
	return size;
}