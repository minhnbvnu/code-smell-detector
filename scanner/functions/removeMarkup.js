function removeMarkup(range) {
		var markup = findWaiLangMarkup(range);
		if (markup) {
			Dom.removeFromDOM(markup, range, true);
			range.select();
		}
	}