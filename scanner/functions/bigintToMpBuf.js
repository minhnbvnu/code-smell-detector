function bigintToMpBuf(bigint) {
	var buf = Buffer.from(bigint.toByteArray());
	buf = mpNormalize(buf);
	return (buf);
}