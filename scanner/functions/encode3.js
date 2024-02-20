function encode3(data) {
	const uint8 =
		typeof data === 'string'
			? new TextEncoder().encode(data)
			: data instanceof Uint8Array
			? data
			: new Uint8Array(data);
	let result = '',
		i;
	const l = uint8.length;
	for (i = 2; i < l; i += 3) {
		result += base64abc1[uint8[i - 2] >> 2];
		result += base64abc1[((uint8[i - 2] & 3) << 4) | (uint8[i - 1] >> 4)];
		result += base64abc1[((uint8[i - 1] & 15) << 2) | (uint8[i] >> 6)];
		result += base64abc1[uint8[i] & 63];
	}
	if (i === l + 1) {
		result += base64abc1[uint8[i - 2] >> 2];
		result += base64abc1[(uint8[i - 2] & 3) << 4];
		result += '==';
	}
	if (i === l) {
		result += base64abc1[uint8[i - 2] >> 2];
		result += base64abc1[((uint8[i - 2] & 3) << 4) | (uint8[i - 1] >> 4)];
		result += base64abc1[(uint8[i - 1] & 15) << 2];
		result += '=';
	}
	return result;
}