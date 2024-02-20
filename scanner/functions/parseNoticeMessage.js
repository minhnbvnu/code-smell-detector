function parseNoticeMessage(message) {
	const error_fields = {};
	let __byte;
	let field_code;
	let field_value;
	while ((__byte = message.reader.readByte())) {
		field_code = String.fromCharCode(__byte);
		field_value = message.reader.readCString();
		switch (field_code) {
			case 'S':
				error_fields.severity = field_value;
				break;
			case 'C':
				error_fields.code = field_value;
				break;
			case 'M':
				error_fields.message = field_value;
				break;
			case 'D':
				error_fields.detail = field_value;
				break;
			case 'H':
				error_fields.hint = field_value;
				break;
			case 'P':
				error_fields.position = field_value;
				break;
			case 'p':
				error_fields.internalPosition = field_value;
				break;
			case 'q':
				error_fields.internalQuery = field_value;
				break;
			case 'W':
				error_fields.where = field_value;
				break;
			case 's':
				error_fields.schema = field_value;
				break;
			case 't':
				error_fields.table = field_value;
				break;
			case 'c':
				error_fields.column = field_value;
				break;
			case 'd':
				error_fields.dataTypeName = field_value;
				break;
			case 'n':
				error_fields.constraint = field_value;
				break;
			case 'F':
				error_fields.file = field_value;
				break;
			case 'L':
				error_fields.line = field_value;
				break;
			case 'R':
				error_fields.routine = field_value;
				break;
			default:
				break;
		}
	}
	return error_fields;
}