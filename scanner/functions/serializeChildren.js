function serializeChildren(element, child, unrecognized, ephemera, xhtml) {
		while (null != child) {
			if (1 === child.nodeType && unrecognized && "/" + element.nodeName == child.nodeName) {
				child = child.nextSibling;
				break;
			} else if (1 === child.nodeType && isUnrecognized(child)) {
				child = serializeElement(child, child.nextSibling, true, ephemera, xhtml);
			} else {
				serialize(child, ephemera, xhtml);
				child = child.nextSibling;
			}
		}
		return child;
	}