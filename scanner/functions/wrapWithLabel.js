function wrapWithLabel(labelText, element) {
		return $('<label>', {'class': 'aloha-ui-label'})
			.append($('<span>', {'class': 'aloha-ui-label-text', 'text': labelText}))
			.append(element);
	}