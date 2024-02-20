function getEmptyElements(node, elements) {
		var paragraphs = [];

		jQuery(node).find(joinWithComma(elements)).each(function() {
			var paragraph = cloneAndRemoveBRElements(this);

			if (Dom.isEmpty(paragraph) && !containEmptyVisibleElements(paragraph)) {
				paragraphs.push(this);
			}
		});

		return paragraphs;
	}