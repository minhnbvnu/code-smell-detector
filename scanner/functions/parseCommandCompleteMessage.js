function parseCommandCompleteMessage(message) {
	return message.reader.readString(message.byteCount);
}