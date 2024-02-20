function readInt16BE(buffer, offset) {
	offset = offset >>> 0;
	const val = buffer[offset + 1] | (buffer[offset] << 8);
	return val & 32768 ? val | 4294901760 : val;
}