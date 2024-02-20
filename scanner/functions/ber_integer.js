function ber_integer(bytes, from, length) {
	let n = 0n;
	for (const b of bytes.slice(from, from + length)) {
		n = (n << 8n) + BigInt(b);
	}
	return n;
}