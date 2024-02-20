function isUnrecognized(element) {
		var name = element.nodeName;
		var unrecognized = isUnrecognizedMap[name];
		if (null != unrecognized) {
			return unrecognized;
		}
		var closingName = "/" + element.nodeName;
		var sibling = element.nextSibling;
		unrecognized = false;
		while (null != sibling) {
			if (closingName == sibling.nodeName) {
				unrecognized = true;
				break;
			}
			sibling = sibling.nextSibling;
		}
		isUnrecognizedMap[name] = unrecognized;
		return unrecognized;
	}