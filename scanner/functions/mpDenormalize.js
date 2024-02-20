function mpDenormalize(buf) {
	assert.buffer(buf);
	while (buf.length > 1 && buf[0] === 0x00)
		buf = buf.slice(1);
	return (buf);
}