function allowNestedParagraph(editable) {
		if (editable.obj[0] && Dom.allowsNesting(editable.obj[0], jQuery("<p>")[0])) {
			return true;
		}
		return false;
	}