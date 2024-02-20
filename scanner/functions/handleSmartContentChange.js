function handleSmartContentChange(editable) {
		return ContentHandlerManager.handleContent(editable.getContents(), {
			contenthandler: Aloha.settings.contentHandler.smartContentChange
		}, editable);
	}