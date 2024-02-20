function buildQuery(sql, params = []) {
	const data = encode2(replaceParams(sql, params));
	const writer = new BufferWriter(new Uint8Array(data.length + 1));
	writer.write(3);
	writer.writeBuffer(data);
	return writer.buffer;
}