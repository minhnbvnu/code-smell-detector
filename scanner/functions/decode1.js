function decode1(value, column) {
	if (column.format === Format.BINARY) {
		return decodeBinary();
	} else if (column.format === Format.TEXT) {
		return decodeText(value, column.typeOid);
	} else {
		throw new Error(`Unknown column format: ${column.format}`);
	}
}