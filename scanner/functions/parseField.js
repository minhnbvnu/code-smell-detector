function parseField(reader) {
	const catalog = reader.readLenCodeString();
	const schema = reader.readLenCodeString();
	const table = reader.readLenCodeString();
	const originTable = reader.readLenCodeString();
	const name = reader.readLenCodeString();
	const originName = reader.readLenCodeString();
	reader.skip(1);
	const encoding = reader.readUint16();
	const fieldLen = reader.readUint32();
	const fieldType = reader.readUint8();
	const fieldFlag = reader.readUint16();
	const decimals = reader.readUint8();
	reader.skip(1);
	const defaultVal = reader.readLenCodeString();
	return {
		catalog,
		schema,
		table,
		originName,
		fieldFlag,
		originTable,
		fieldLen,
		name,
		fieldType,
		encoding,
		decimals,
		defaultVal,
	};
}