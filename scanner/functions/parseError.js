function parseError(reader, conn) {
	const code = reader.readUint16();
	const packet = {
		code,
		message: '',
	};
	if (conn.capabilities & ServerCapabilities.CLIENT_PROTOCOL_41) {
		packet.sqlStateMarker = reader.readUint8();
		packet.sqlState = reader.readUints(5);
	}
	packet.message = reader.readNullTerminatedString();
	return packet;
}