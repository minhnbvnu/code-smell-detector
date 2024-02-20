function decodeByteaEscape(byteaStr) {
	const bytes = [];
	let i = 0;
	let k = 0;
	while (i < byteaStr.length) {
		if (byteaStr[i] !== '\\') {
			bytes.push(byteaStr.charCodeAt(i));
			++i;
		} else {
			if (/[0-7]{3}/.test(byteaStr.substr(i + 1, 3))) {
				bytes.push(parseInt(byteaStr.substr(i + 1, 3), 8));
				i += 4;
			} else {
				let backslashes = 1;
				while (i + backslashes < byteaStr.length && byteaStr[i + backslashes] === '\\') {
					backslashes++;
				}
				for (k = 0; k < Math.floor(backslashes / 2); ++k) {
					bytes.push(92);
				}
				i += Math.floor(backslashes / 2) * 2;
			}
		}
	}
	return new Uint8Array(bytes);
}