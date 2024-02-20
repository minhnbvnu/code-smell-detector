function isAllowedNodeName(nodeType) {
		return !!(
			Aloha.settings.contentHandler &&
			Aloha.settings.contentHandler.allows &&
			Aloha.settings.contentHandler.allows.elements &&
			($.inArray(
		              nodeType.toLowerCase(), 
				      Aloha.settings.contentHandler.allows.elements
				         ) !== -1
			   )
		);
	}