function decodeBigintArray(value) {
	return parseArray(value, x => BigInt(x));
}