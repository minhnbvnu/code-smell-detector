function readUInt32BE(buffer, offset) {
	offset = offset >>> 0;
	return (
		buffer[offset] * 16777216 +
		((buffer[offset + 1] << 16) | (buffer[offset + 2] << 8) | buffer[offset + 3])
	);
}