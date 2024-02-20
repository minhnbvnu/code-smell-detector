function encodeBytes(value) {
	const hex = Array.from(value)
		.map(val => (val < 16 ? `0${val.toString(16)}` : val.toString(16)))
		.join('');
	return `\\x${hex}`;
}