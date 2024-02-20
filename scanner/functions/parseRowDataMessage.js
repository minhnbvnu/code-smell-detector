function parseRowDataMessage(message) {
	const field_count = message.reader.readInt16();
	const row = [];
	for (let i = 0; i < field_count; i++) {
		const col_length = message.reader.readInt32();
		if (col_length == -1) {
			row.push(null);
			continue;
		}
		row.push(message.reader.readBytes(col_length));
	}
	return row;
}