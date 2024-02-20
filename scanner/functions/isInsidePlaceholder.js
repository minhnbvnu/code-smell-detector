function isInsidePlaceholder(range) {
		var start = range.startContainer;
		var end = range.endContainer;
		var $placeholder = window.$_alohaPlaceholder;

		return $placeholder.is(start) || $placeholder.is(end) || nodeContains($placeholder[0], start) || nodeContains($placeholder[0], end);
	}