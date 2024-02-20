function unNormalizeSublists(item, range) {
		// "If item is not an ol or ol or it is not editable or its parent is not
		// editable, abort these steps."
		if (!isHtmlElementInArray(item, ["OL", "UL"]) || !isEditable(item)) {
			return;
		}

		var $list = jQuery(item);
		$list.children("ol,ul").each(function (index, sublist) {
			if (isNamedHtmlElement(sublist.previousSibling, "LI")) {
				// move the sublist into the LI
				movePreservingRanges(sublist, sublist.previousSibling, sublist.previousSibling.childNodes.length, range);
			}
		});
	}