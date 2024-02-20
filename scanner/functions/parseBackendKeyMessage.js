function parseBackendKeyMessage(message) {
	return {
		pid: message.reader.readInt32(),
		secret_key: message.reader.readInt32(),
	};
}