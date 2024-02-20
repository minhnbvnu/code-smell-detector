function isListWhitespaceToRemove(node) {
		// no whitespace node –> no need to remove
		if (!isWhitespaceNode(node)) {
			return false;
		}

		// always remove whitespace children from ul and ol
		if (node.parentNode.nodeName === 'UL' || node.parentNode.nodeName === 'OL') {
			return true;
		}

		if (node.parentNode.nodeName !== 'LI') {
			return false;
		}

		// only remove whitespace from li if it is between (the opening tag/a block level element)
		// and (a block level element/the closing tag)
		var index = Dom.getIndexInParent(node);
		var last = node.parentNode.childNodes.length - 1;
		var cleanElements = Dom.blockLevelElements.concat(Dom.listElements);

		return (index === 0 ||
		         cleanElements.indexOf(node.previousSibling.nodeName.toLowerCase()) > -1) &&
		       (index === last ||
		         cleanElements.indexOf(node.nextSibling.nodeName.toLowerCase()) > -1);
	}