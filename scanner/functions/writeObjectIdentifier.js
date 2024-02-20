function writeObjectIdentifier(oid) {
	return new type.Component([new type.UInt8(5), new type.UInt8((oid[0] << 4) & (oid[1] & 0x0f)), new type.UInt8(oid[2]), new type.UInt8(oid[3]), new type.UInt8(oid[4]), new type.UInt8(oid[5])]);
}