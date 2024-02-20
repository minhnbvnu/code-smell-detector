function moveNextAll(parent, firstChild, refChild) {
		while (firstChild) {
			var nextChild = firstChild.nextSibling;
			parent.insertBefore(firstChild, refChild);
			firstChild = nextChild;
		}
	}