function encode2(value) {
	if (value === null || typeof value === 'undefined') {
		return null;
	} else if (value instanceof Uint8Array) {
		return encodeBytes(value);
	} else if (value instanceof Date) {
		return encodeDate(value);
	} else if (value instanceof Array) {
		return encodeArray(value);
	} else if (value instanceof Object) {
		return JSON.stringify(value);
	} else {
		return String(value);
	}
}