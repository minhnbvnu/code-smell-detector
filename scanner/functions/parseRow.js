function parseRow(reader, fields) {
	const row = {};
	for (const field of fields) {
		const name = field.name;
		const val = reader.readLenCodeString();
		row[name] = val === null ? null : convertType(field, val);
	}
	return row;
}