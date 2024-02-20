function ber_oid(bytes, from, length) {
	const id = [(bytes[from] / 40) | 0, bytes[from] % 40];
	let value = 0;
	for (const b of bytes.slice(from + 1, from + length)) {
		if (b > 128) value += value * 127 + (b - 128);
		else {
			value = value * 128 + b;
			id.push(value);
			value = 0;
		}
	}
	return id.join('.');
}