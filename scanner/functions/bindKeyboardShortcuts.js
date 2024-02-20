function bindKeyboardShortcuts() {
	whenUIChromeLoaded(() => {
		if (hasResetInitialSettingsDropdown) {
			return;
		}
		resetSettingsDropdown();
		hasResetInitialSettingsDropdown = true;
	});
	
	// Main menu
	// - Show Settings
	ipcRenderer.on(constants.SHOW_MESSENGER_SETTINGS, () => {
		document.querySelector(SETTINGS_LINK).click();
	});

	// File menu
	// - New Conversation
	ipcRenderer.on(constants.NEW_CONVERSATION, () => {
		document.querySelector(isPreviousMessengerVersion() ? NEW_MESSAGE_BUTTON_PREV : NEW_MESSAGE_BUTTON).click();
		ipcRenderer.send(constants.OPEN_MESSENGER);
	});
	
	// View menu
	// - Inbox
	ipcRenderer.on(constants.SHOW_MESSAGE_LIST_INBOX, () => {
		resetMessageListToInbox();
		ipcRenderer.send(constants.OPEN_MESSENGER);
	});
	
	// - Active contacts
	ipcRenderer.on(constants.SHOW_MESSAGE_LIST_ACTIVE_CONTACTS, () => {
		openMessageList(MESSAGE_LIST_ACTIVE_CONTACTS_LINK);
		ipcRenderer.send(constants.OPEN_MESSENGER);
	});
	
	// - Message requests
	ipcRenderer.on(constants.SHOW_MESSAGE_LIST_MESSAGE_REQUESTS, () => {
		openMessageList(MESSAGE_LIST_MESSAGE_REQUESTS_LINK);
		ipcRenderer.send(constants.OPEN_MESSENGER);
	});
	
	// - Hidden chats
	ipcRenderer.on(constants.SHOW_MESSAGE_LIST_HIDDEN_CHATS, () => {
		openMessageList(MESSAGE_LIST_HIDE_CHATS_LINK);
		ipcRenderer.send(constants.OPEN_MESSENGER);
	});

	// - Unread chats
	ipcRenderer.on(constants.SHOW_MESSAGE_LIST_UNREAD_CHATS, () => {
		openMessageList(MESSAGE_LIST_HIDE_CHATS_LINK);
		ipcRenderer.send(constants.OPEN_MESSENGER);
	});
	
	// Conversation menu
	// - Mute conversation
	ipcRenderer.on(constants.MUTE_CONVERSATION, () => {
		conversationAction(MUTE_CONVERSATION_LINK_INDEX, MUTE_GROUP_CONVERSATION_LINK_INDEX);
	});
	
	// - Hide conversation
	ipcRenderer.on(constants.HIDE_CHAT, () => {
		conversationAction(HIDE_CHAT_LINK_INDEX, HIDE_GROUP_CONVERSATION_LINK_INDEX);
	});

	// - Delete conversation
	ipcRenderer.on(constants.DELETE_CONVERSATION, () => {
		conversationAction(DELETE_CONVERSATION_LINK_INDEX, DELETE_GROUP_CONVERSATION_LINK_INDEX);
	});

	// - Mark read / unread conversation
	ipcRenderer.on(constants.MARK_CONVERSATION_UNREAD, () => {
		conversationAction(MARK_CONVERSATION_UNREAD_LINK_INDEX, MARK_GROUP_CONVERSATION_UNREAD_LINK_INDEX);
	});

	// - Mark spam conversation
	ipcRenderer.on(constants.MARK_CONVERSATION_SPAM, () => {
		conversationAction(MARK_CONVERSATION_SPAM_LINK_INDEX, MARK_GROUP_CONVERSATION_SPAM_LINK_INDEX);
	});

	// - Report conversation
	ipcRenderer.on(constants.REPORT_CONVERSATION_SPAM_OR_ABUSE, () => {
		conversationAction(REPORT_CONVERSATION_SPAM_OR_ABUSE_LINK_INDEX, 
			REPORT_GROUP_CONVERSATION_SPAM_OR_ABUSE_LINK_INDEX);
	});
	
	// Window menu
	// - Select next Conversation
	ipcRenderer.on(constants.NEXT_CONVERSATION, () => {
		const nextConversation = document.querySelector(SELECTED_CONVERSATION).nextSibling;
		if (nextConversation) {
			nextConversation.querySelector(ACTIVATE_CONVERSATION).click();
		}
	});
	
	// - Select previous Conversation
	ipcRenderer.on(constants.PREV_CONVERSATION, () => {
		const nextConversation = document.querySelector(SELECTED_CONVERSATION).previousSibling;
		if (nextConversation) {
			nextConversation.querySelector(ACTIVATE_CONVERSATION).click();
		}
	});

	// Touchbar
	// - Like conversation
	ipcRenderer.on(constants.LIKE_CONVERSATION, () => {
		const like = document.querySelector(isPreviousMessengerVersion() ? LIKE_CONVERSATION_LINK_PREV : LIKE_CONVERSATION_LINK);
		if (like) {
			const mouseDown = document.createEvent('MouseEvents');
			mouseDown.initEvent('mousedown', true, true);
			like.dispatchEvent(mouseDown);

			const mouseUp = document.createEvent('MouseEvents');
			mouseUp.initEvent('mouseup', true, true);
			like.dispatchEvent(mouseUp);
		}
	});
}