function wrapContent(content) {
		if (typeof content === 'string') {
			return $('<div>' + content + '</div>');
		}
		if (content instanceof $) {
			return $('<div>').append(content);
		}
		return null;
	}