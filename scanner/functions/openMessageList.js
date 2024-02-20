function openMessageList(messageListLink) {
	resetMessageListToInbox();
	document.querySelector(messageListLink).click();
}