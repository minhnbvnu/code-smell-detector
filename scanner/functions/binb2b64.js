function binb2b64(binarray) {
	var tab = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', str = '';
	for (var i = 0; i < binarray.length * 4; i += 3) {
		var triplet = (binarray[i >> 2] >> 8 * (3 - i % 4) & 255) << 16 | (binarray[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4) & 255) << 8 | binarray[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4) & 255;
		for (var j = 0; j < 4; j++) i * 8 + j * 6 > binarray.length * 32 ? str += b64pad : str += tab.charAt(triplet >> 6 * (3 - j) & 63);
	}
	return str;
}