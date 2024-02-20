function getNewSelectedElement(type, parent) {
		var toSelectElement;
		if ('first' === type) {
			toSelectElement = jQuery('[contenteditable]', parent).first()[0]
				.firstChild;
			if (undefined === toSelectElement) {
				toSelectElement = jQuery('*', parent).first()[0].firstChild;
			}
		} else if ('last' === type) {
			toSelectElement = getPlainHierarchy(jQuery('td:last', parent))
				.reverse()[0];
		}

		return toSelectElement;
	}