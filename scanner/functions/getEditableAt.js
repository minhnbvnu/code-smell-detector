function getEditableAt(range) {
		if (!range || !range.commonAncestorContainer) {
			return null;
		}
		var $container = $(range.commonAncestorContainer);
		return $container.length ? Aloha.getEditableHost($container) : null;
	}