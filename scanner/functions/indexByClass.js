function indexByClass(root, classMap) {
		var elems;
		if (Browser.ie7) {
			elems = root.getElementsByTagName('*');
		} else {
			// Optimize for browsers that support querySelectorAll/getElementsByClassName.
			// On IE8 for example, if there is a relatively high
			// elems/resultSet ratio, performance can improve by a factor of 2.
			elems = $(root).find('.' + Maps.keys(classMap).join(',.'));
		}
		return indexByClassHaveList(elems, classMap);
	}