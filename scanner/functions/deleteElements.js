function deleteElements(elements) {
		var i,
		    len;

		for (i = 0, len = elements.length; i < len; i++) {
			Dom2.remove(elements[i]);
		}
	}