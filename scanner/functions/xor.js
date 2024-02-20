function xor(a, b) {
	return a.map((__byte, index) => {
		return __byte ^ b[index];
	});
}