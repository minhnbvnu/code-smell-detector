function getStringFromWasm0(ptr, len) {
	return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}