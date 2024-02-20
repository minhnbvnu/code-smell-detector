function buildAuth(packet, params) {
	const clientParam =
		(params.db ? ServerCapabilities.CLIENT_CONNECT_WITH_DB : 0) |
		ServerCapabilities.CLIENT_PLUGIN_AUTH |
		ServerCapabilities.CLIENT_LONG_PASSWORD |
		ServerCapabilities.CLIENT_PROTOCOL_41 |
		ServerCapabilities.CLIENT_TRANSACTIONS |
		ServerCapabilities.CLIENT_MULTI_RESULTS |
		ServerCapabilities.CLIENT_SECURE_CONNECTION |
		(ServerCapabilities.CLIENT_LONG_FLAG & packet.serverCapabilities) |
		(ServerCapabilities.CLIENT_PLUGIN_AUTH_LENENC_CLIENT_DATA & packet.serverCapabilities) |
		(ServerCapabilities.CLIENT_DEPRECATE_EOF & packet.serverCapabilities);
	if (packet.serverCapabilities & ServerCapabilities.CLIENT_PLUGIN_AUTH) {
		const writer = new BufferWriter(new Uint8Array(1000));
		writer
			.writeUint32(clientParam)
			.writeUint32(2 ** 24 - 1)
			.write(Charset.UTF8_GENERAL_CI)
			.skip(23)
			.writeNullTerminatedString(params.username);
		if (params.password) {
			const authData = auth(packet.authPluginName, params.password, packet.seed);
			if (
				clientParam & ServerCapabilities.CLIENT_PLUGIN_AUTH_LENENC_CLIENT_DATA ||
				clientParam & ServerCapabilities.CLIENT_SECURE_CONNECTION
			) {
				writer.write(authData.length);
				writer.writeBuffer(authData);
			} else {
				writer.writeBuffer(authData);
				writer.write(0);
			}
		} else {
			writer.write(0);
		}
		if (clientParam & ServerCapabilities.CLIENT_CONNECT_WITH_DB && params.db) {
			writer.writeNullTerminatedString(params.db);
		}
		if (clientParam & ServerCapabilities.CLIENT_PLUGIN_AUTH) {
			writer.writeNullTerminatedString(packet.authPluginName);
		}
		return writer.wroteData;
	}
	return Uint8Array.from([]);
}