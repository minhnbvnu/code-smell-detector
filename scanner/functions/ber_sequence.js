function ber_sequence(bytes, from, length) {
	const end = from + length;
	let res = [];
	let ptr = from;
	while (ptr < end) {
		const next = ber_next(bytes, ptr);
		res.push(next);
		ptr += next.totalLength;
	}
	return res;
}