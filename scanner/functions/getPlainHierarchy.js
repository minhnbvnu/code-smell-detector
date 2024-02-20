function getPlainHierarchy(element) {
		if (element.jquery) {
			element = element[0];
		}
		var i, result = [], child;
		for (i = 0; i < element.childNodes.length; i++) {
			child = element.childNodes[i];
			result.push(child);
			if (child.nodeType === 1) {
				result = result.concat(getPlainHierarchy(child));
			}
		}

		return result;
	}