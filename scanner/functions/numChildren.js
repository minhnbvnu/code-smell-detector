function numChildren(elem) {
		var count = 0;
		var child = elem.firstChild;
		while (child) {
			count += 1;
			child = child.nextSibling;
		}
		return count;
	}