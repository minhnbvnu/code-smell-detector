function writeMCSPDUHeader(mcsPdu, options) {
	options = options || 0;
    return new type.UInt8((mcsPdu << 2) | options);
}