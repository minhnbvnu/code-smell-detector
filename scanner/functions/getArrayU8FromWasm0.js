function getArrayU8FromWasm0(ptr, len) {
	return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}