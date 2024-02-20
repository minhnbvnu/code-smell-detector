function decodeTid(value) {
	const [x, y] = value.substring(1, value.length - 1).split(',');
	return [BigInt(x), BigInt(y)];
}