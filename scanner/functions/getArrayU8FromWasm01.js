function getArrayU8FromWasm01(ptr, len) {
	return getUint8Memory01().subarray(ptr / 1, ptr / 1 + len);
}