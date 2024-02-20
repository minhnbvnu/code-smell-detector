function parseRowDescriptionMessage(message) {
	const column_count = message.reader.readInt16();
	const columns = [];
	for (let i = 0; i < column_count; i++) {
		const column = new Column(
			message.reader.readCString(),
			message.reader.readInt32(),
			message.reader.readInt16(),
			message.reader.readInt32(),
			message.reader.readInt16(),
			message.reader.readInt32(),
			message.reader.readInt16()
		);
		columns.push(column);
	}
	return new RowDescription(column_count, columns);
}