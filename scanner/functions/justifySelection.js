function justifySelection(alignment, range) {

		// "Block-extend the active range, and let new range be the result."
		var newRange = blockExtend(range);

		// "Let element list be a list of all editable Elements contained in new
		// range that either has an attribute in the HTML namespace whose local
		// name is "align", or has a style attribute that sets "text-align", or is
		// a center."
		var elementList = getAllContainedNodes(newRange, function (node) {
			return node.nodeType == $_.Node.ELEMENT_NODE && isEditable(node)
			// Ignoring namespaces here
				&& (hasAttribute(node, "align") || node.style.textAlign != "" || isNamedHtmlElement(node, 'center'));
		});

		// "For each element in element list:"
		var i;
		for (i = 0; i < elementList.length; i++) {
			var element = elementList[i];

			// "If element has an attribute in the HTML namespace whose local name
			// is "align", remove that attribute."
			element.removeAttribute("align");

			// "Unset the CSS property "text-align" on element, if it's set by a
			// style attribute."
			element.style.textAlign = "";
			if (element.getAttribute("style") == "") {
				element.removeAttribute("style");
			}

			// "If element is a div or span or center with no attributes, remove
			// it, preserving its descendants."
			if (isHtmlElementInArray(element, ["div", "span", "center"]) && !element.attributes.length) {
				removePreservingDescendants(element, range);
			}

			// "If element is a center with one or more attributes, set the tag
			// name of element to "div"."
			if (isNamedHtmlElement(element, 'center') && element.attributes.length) {
				setTagName(element, "div", range);
			}
		}

		// "Block-extend the active range, and let new range be the result."
		newRange = blockExtend(globalRange);

		// "Let node list be a list of nodes, initially empty."
		var nodeList = [];

		// "For each node node contained in new range, append node to node list if
		// the last member of node list (if any) is not an ancestor of node; node
		// is editable; node is an allowed child of "div"; and node's alignment
		// value is not alignment."
		nodeList = getContainedNodes(newRange, function (node) {
			return isEditable(node) && isAllowedChild(node, "div") && getAlignmentValue(node) != alignment;
		});

		function makeIsAlignedDiv(alignment) {
			return function (node) {
				return isNamedHtmlElement(node, 'div') && $_(node.attributes).every(function (attr) {
					return (attr.name == "align" && attr.value.toLowerCase() == alignment) || (attr.name == "style" && getStyleLength(node) == 1 && node.style.textAlign == alignment);
				});
			};
		}

		function makeCreateAlignedDiv(alignment) {
			return function () {
				var newParent = document.createElement("div");
				newParent.setAttribute("style", "text-align: " + alignment);
				return newParent;
			};
		}

		// "While node list is not empty:"
		while (nodeList.length) {
			// "Let sublist be a list of nodes, initially empty."
			var sublist = [];

			// "Remove the first member of node list and append it to sublist."
			sublist.push(nodeList.shift());

			// "While node list is not empty, and the first member of node list is
			// the nextSibling of the last member of sublist, remove the first
			// member of node list and append it to sublist."
			while (nodeList.length && nodeList[0] == sublist[sublist.length - 1].nextSibling) {
				sublist.push(nodeList.shift());
			}

			// "Wrap sublist. Sibling criteria returns true for any div that has
			// one or both of the following two attributes and no other attributes,
			// and false otherwise:"
			//
			//   * "An align attribute whose value is an ASCII case-insensitive
			//     match for alignment.
			//   * "A style attribute which sets exactly one CSS property
			//     (including unrecognized or invalid attributes), which is
			//     "text-align", which is set to alignment.
			//
			// "New parent instructions are to call createElement("div") on the
			// context object, then set its CSS property "text-align" to alignment
			// and return the result."
			wrap(
				sublist,
				makeIsAlignedDiv(alignment),
				makeCreateAlignedDiv(alignment),
				range
			);
		}
	}