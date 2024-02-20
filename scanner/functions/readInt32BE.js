function readInt32BE(buffer, offset) {
	offset = offset >>> 0;
	return (
		(buffer[offset] << 24) |
		(buffer[offset + 1] << 16) |
		(buffer[offset + 2] << 8) |
		buffer[offset + 3]
	);
}