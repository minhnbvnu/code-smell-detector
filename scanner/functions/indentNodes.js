function indentNodes(nodeList, range) {
		// "If node list is empty, do nothing and abort these steps."
		if (!nodeList.length) {
			return;
		}

		// "Let first node be the first member of node list."
		var firstNode = nodeList[0];

		// "If first node's parent is an ol or ul:"
		if (isHtmlElementInArray(firstNode.parentNode, ["OL", "UL"])) {
			// "Let tag be the local name of the parent of first node."
			var tag = firstNode.parentNode.tagName;

			// "Wrap node list, with sibling criteria returning true for an HTML
			// element with local name tag and false otherwise, and new parent
			// instructions returning the result of calling createElement(tag) on
			// the ownerDocument of first node."
			wrap(
				nodeList,
				function (node) {
					return isHtmlElement_obsolete(node, tag);
				},
				function () {
					return firstNode.ownerDocument.createElement(tag);
				},
				range
			);

			// "Abort these steps."
			return;
		}

		// "Wrap node list, with sibling criteria returning true for a simple
		// indentation element and false otherwise, and new parent instructions
		// returning the result of calling createElement("blockquote") on the
		// ownerDocument of first node. Let new parent be the result."
		var newParent = wrap(
			nodeList,
			function (node) {
				return isSimpleIndentationElement(node);
			},
			function () {
				return firstNode.ownerDocument.createElement("blockquote");
			},
			range
		);

		// "Fix disallowed ancestors of new parent."
		fixDisallowedAncestors(newParent, range);
	}