function resetMessageListToInbox() {
	const activeContactsLink = document.querySelector(MESSAGE_LIST_ACTIVE_CONTACTS_LINK);
	if (activeContactsLink) {
		// If the Active Contacts link visible, Inbox is already showing
		return;
	}

	const messageListInbox = document.querySelector(isPreviousMessengerVersion() ? MESSAGE_LIST_INBOX_LINK_PREV : MESSAGE_LIST_INBOX_LINK);
	if (messageListInbox) {
		messageListInbox.click();
	}

	resetSettingsDropdown();
}