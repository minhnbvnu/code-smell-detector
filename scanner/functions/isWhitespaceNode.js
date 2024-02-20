function isWhitespaceNode(node) {
		var nodeTypes = $_.Node;
		if (node && node.nodeType === nodeTypes.TEXT_NODE) {
			var parentNode = node.parentNode;

			var nodeData = node.data;
			if (jQuery.trim(nodeData).length === 0) {
				return true;
			} else if (parentNode && /^[\t\n\r ]+$/.test(nodeData)) {
				if (parentNode.nodeType === nodeTypes.ELEMENT_NODE) {
					if (jQuery.inArray($_.getComputedStyle(parentNode).whiteSpace, ["normal", "nowrap"]) !== -1) {
						return true;
					} else if ($_.getComputedStyle(parentNode).whiteSpace === "pre-line") {
						return true;
					}
				} else if (parentNode.nodeType === nodeTypes.DOCUMENT_FRAGMENT_NODE) {
					return true;
				}
			}
		}
		return false;
	}