function processRequire(node, isFirst) {
		// make sure we have a valid required view and get its path
		var fullpath = getViewRequirePath(node);
		if (fullpath === null) {
			return;
		}

		// re-assemble XML with required elements
		if (isFirst) {
			cloneNode = U.XML.getAlloyFromFile(fullpath);
		} else {
			var newDocRoot = U.XML.getAlloyFromFile(fullpath);
			_.each(U.XML.getElementsFromNodes(newDocRoot.childNodes), function(n) {
				insertAfter(n, node);
			});

			node.parentNode.removeChild(node);
		}
	}