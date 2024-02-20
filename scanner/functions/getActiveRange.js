function getActiveRange() {
		var ret;
		if (globalRange) {
			ret = globalRange;
		} else if (Aloha.getSelection().rangeCount) {
			ret = Aloha.getSelection().getRangeAt(0);
		} else {
			return null;
		}
		if (jQuery.inArray(ret.startContainer.nodeType, [$_.Node.TEXT_NODE, $_.Node.ELEMENT_NODE]) == -1 || jQuery.inArray(ret.endContainer.nodeType, [$_.Node.TEXT_NODE, $_.Node.ELEMENT_NODE]) == -1 || !ret.startContainer.ownerDocument || !ret.endContainer.ownerDocument || !isDescendant(ret.startContainer, ret.startContainer.ownerDocument) || !isDescendant(ret.endContainer, ret.endContainer.ownerDocument)) {
			throw "Invalid active range; test bug?";
		}
		return ret;
	}