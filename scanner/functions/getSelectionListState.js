function getSelectionListState() {
		// "Block-extend the active range, and let new range be the result."
		var newRange = blockExtend(getActiveRange());

		// "Let node list be a list of nodes, initially empty."
		//
		// "For each node contained in new range, append node to node list if the
		// last member of node list (if any) is not an ancestor of node; node is
		// editable; node is not an indentation element; and node is either an ol
		// or ul, or the child of an ol or ul, or an allowed child of "li"."
		var nodeList = getContainedNodes(newRange, function (node) {
			return isEditable(node) && !isIndentationElement(node) && (isHtmlElementInArray(node, ["ol", "ul"]) || isHtmlElementInArray(node.parentNode, ["ol", "ul"]) || isAllowedChild(node, "li"));
		});

		// "If node list is empty, return "none"."
		if (!nodeList.length) {
			return "none";
		}

		// "If every member of node list is either an ol or the child of an ol or
		// the child of an li child of an ol, and none is a ul or an ancestor of a
		// ul, return "ol"."
		if ($_(nodeList).every(function (node) { return (isNamedHtmlElement(node, 'ol')
														 || isNamedHtmlElement(node.parentNode, "ol")
														 || (isNamedHtmlElement(node.parentNode, "li")
															 && isNamedHtmlElement(node.parentNode.parentNode, "ol"))); })
			    && !$_(nodeList).some(function (node) { return isNamedHtmlElement(node, 'ul') || (node.querySelector && node.querySelector("ul")); })) {
			return "ol";
		}

		// "If every member of node list is either a ul or the child of a ul or the
		// child of an li child of a ul, and none is an ol or an ancestor of an ol,
		// return "ul"."
		if ($_(nodeList).every(function (node) { return (isNamedHtmlElement(node, 'ul')
														 || isNamedHtmlElement(node.parentNode, "ul")
														 || (isNamedHtmlElement(node.parentNode, "li")
															 && isNamedHtmlElement(node.parentNode.parentNode, "ul"))); })
			    && !$_(nodeList).some(function (node) { return isNamedHtmlElement(node, 'ol') || (node.querySelector && node.querySelector("ol")); })) {
			return "ul";
		}

		var hasOl = $_(nodeList).some(function (node) {
			return (isNamedHtmlElement(node, 'ol')
					|| isNamedHtmlElement(node.parentNode, "ol")
					|| (node.querySelector && node.querySelector("ol"))
					|| (isNamedHtmlElement(node.parentNode, "li")
						&& isNamedHtmlElement(node.parentNode.parentNode, "ol")));
		});
		var hasUl = $_(nodeList).some(function (node) {
			return (isNamedHtmlElement(node, 'ul')
					|| isNamedHtmlElement(node.parentNode, "ul")
					|| (node.querySelector && node.querySelector("ul"))
					|| (isNamedHtmlElement(node.parentNode, "li")
						&& isNamedHtmlElement(node.parentNode.parentNode, "ul")));
		});
		// "If some member of node list is either an ol or the child or ancestor of
		// an ol or the child of an li child of an ol, and some member of node list
		// is either a ul or the child or ancestor of a ul or the child of an li
		// child of a ul, return "mixed"."
		if (hasOl && hasUl) {
			return "mixed";
		}

		// "If some member of node list is either an ol or the child or ancestor of
		// an ol or the child of an li child of an ol, return "mixed ol"."
		if (hasOl) {
			return "mixed ol";
		}

		// "If some member of node list is either a ul or the child or ancestor of
		// a ul or the child of an li child of a ul, return "mixed ul"."
		if (hasUl) {
			return "mixed ul";
		}

		// "Return "none"."
		return "none";
	}