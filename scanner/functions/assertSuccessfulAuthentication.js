function assertSuccessfulAuthentication(auth_message) {
	if (auth_message.type === ERROR_MESSAGE) {
		throw new PostgresError1(parseNoticeMessage(auth_message));
	}
	if (auth_message.type !== INCOMING_AUTHENTICATION_MESSAGES.AUTHENTICATION) {
		throw new Error(`Unexpected auth response: ${auth_message.type}.`);
	}
	const responseCode = auth_message.reader.readInt32();
	if (responseCode !== 0) {
		throw new Error(`Unexpected auth response code: ${responseCode}.`);
	}
}