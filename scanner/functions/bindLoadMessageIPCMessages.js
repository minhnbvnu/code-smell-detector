function bindLoadMessageIPCMessages() {
	ipcRenderer.on(constants.JUMP_TO_CONVERSATION, (event, id) => {
		const conversation = document.querySelector(`[id='${id}'] a`);
		if (conversation) {
			conversation.click();
		}
	});
	
	ipcRenderer.on(constants.JUMP_TO_CONVERSATION_BY_IMAGE_NAME, (event, imageName) => {
		const conversation = document.querySelector(`div[role="navigation"] > div > ul img[src*="${imageName}"]`);
		if (conversation) {
			conversation.click();
		}
	});
}