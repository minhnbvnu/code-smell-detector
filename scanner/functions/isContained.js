function isContained(node, range) {
		var pos1 = getPosition(node, 0, range.startContainer, range.startOffset);
		if (pos1 !== "after") {
			return false;
		}
		var pos2 = getPosition(node, getNodeLength(node), range.endContainer, range.endOffset);
		if (pos2 !== "before") {
			return false;
		}
		return getFurthestAncestor(node) == getFurthestAncestor(range.startContainer);
	}