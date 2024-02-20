function getStringFromWasm01(ptr, len) {
	return cachedTextDecoder1.decode(getUint8Memory01().subarray(ptr, ptr + len));
}