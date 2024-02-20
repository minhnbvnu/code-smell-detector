function assertSuccessfulStartup(msg) {
	switch (msg.type) {
		case ERROR_MESSAGE:
			throw new PostgresError1(parseNoticeMessage(msg));
	}
}