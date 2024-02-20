function toggleLists(tagName, range) {
		// "Let mode be "disable" if the selection's list state is tag name, and
		// "enable" otherwise."
		var mode = getSelectionListState() == tagName ? "disable" : "enable";

		tagName = tagName.toUpperCase();

		// "Let other tag name be "ol" if tag name is "ul", and "ul" if tag name is
		// "ol"."
		var otherTagName = tagName == "OL" ? "UL" : "OL";

		// "Let items be a list of all lis that are ancestor containers of the
		// range's start and/or end node."
		//
		// It's annoying to get this in tree order using functional stuff without
		// doing getDescendants(document), which is slow, so I do it imperatively.
		var items = [];
		(function () {
			var ancestorContainer;
			for (ancestorContainer = range.endContainer;
				     ancestorContainer != range.commonAncestorContainer;
				     ancestorContainer = ancestorContainer.parentNode) {
				if (isNamedHtmlElement(ancestorContainer, "li")) {
					items.unshift(ancestorContainer);
				}
			}
			for (ancestorContainer = range.startContainer;
				     ancestorContainer;
				     ancestorContainer = ancestorContainer.parentNode) {
				if (isNamedHtmlElement(ancestorContainer, "li")) {
					items.unshift(ancestorContainer);
				}
			}
		}());

		// "For each item in items, normalize sublists of item."
		$_(items).forEach(function (thisArg) {
			normalizeSublists(thisArg, range);
		});

		// "Block-extend the range, and let new range be the result."
		var newRange = blockExtend(range);

		// "If mode is "enable", then let lists to convert consist of every
		// editable HTML element with local name other tag name that is contained
		// in new range, and for every list in lists to convert:"
		if (mode == "enable") {
			$_(getAllContainedNodes(newRange, function (node) {
				return isEditable(node) && isHtmlElement_obsolete(node, otherTagName);
			})).forEach(function (list) {
				// "If list's previousSibling or nextSibling is an editable HTML
				// element with local name tag name:"
				if ((isEditable(list.previousSibling) && isHtmlElement_obsolete(list.previousSibling, tagName)) || (isEditable(list.nextSibling) && isHtmlElement_obsolete(list.nextSibling, tagName))) {
					// "Let children be list's children."
					var children = [].slice.call(toArray(list.childNodes));

					// "Record the values of children, and let values be the
					// result."
					var values = recordValues(children);

					// "Split the parent of children."
					splitParent(children, range);

					// "Wrap children, with sibling criteria returning true for an
					// HTML element with local name tag name and false otherwise."
					wrap(
						children,
						function (node) {
							return isHtmlElement_obsolete(node, tagName);
						},
						function () {
							return null;
						},
						range
					);

					// "Restore the values from values."
					restoreValues(values, range);

					// "Otherwise, set the tag name of list to tag name."
				} else {
					setTagName(list, tagName, range);
				}
			});
		}

		// "Let node list be a list of nodes, initially empty."
		//
		// "For each node node contained in new range, if node is editable; the
		// last member of node list (if any) is not an ancestor of node; node
		// is not an indentation element; and either node is an ol or ul, or its
		// parent is an ol or ul, or it is an allowed child of "li"; then append
		// node to node list."
		var nodeList = getContainedNodes(newRange, function (node) {
			return isEditable(node) && !isIndentationElement(node) && (isHtmlElementInArray(node, ["OL", "UL"]) || isHtmlElementInArray(node.parentNode, ["OL", "UL"]) || isAllowedChild(node, "li"));
		});

		// "If mode is "enable", remove from node list any ol or ul whose parent is
		// not also an ol or ul."
		if (mode == "enable") {
			nodeList = $_(nodeList).filter(function (node) {
				return !isHtmlElementInArray(node, ["ol", "ul"]) || isHtmlElementInArray(node.parentNode, ["ol", "ul"]);
			});
		}

		// "If mode is "disable", then while node list is not empty:"
		var sublist, values;

		function createLi() {
			return document.createElement("li");
		}

		function isOlUl(node) {
			return isHtmlElementInArray(node, ["ol", "ul"]);
		}

		function makeIsElementPred(tagName) {
			return function (node) {
				return isHtmlElement_obsolete(node, tagName);
			};
		}

		function makeCreateElement(tagName) {
			return function () {
				return document.createElement(tagName);
			};
		}

		function makeCreateElementSublist(tagName, sublist, range) {
			return function () {
				// "If sublist's first member's parent is not an editable
				// simple indentation element, or sublist's first member's
				// parent's previousSibling is not an editable HTML element
				// with local name tag name, call createElement(tag name)
				// on the context object and return the result."
				if (!isEditable(sublist[0].parentNode) || !isSimpleIndentationElement(sublist[0].parentNode) || !isEditable(sublist[0].parentNode.previousSibling) || !isHtmlElement_obsolete(sublist[0].parentNode.previousSibling, tagName)) {
					return document.createElement(tagName);
				}

				// "Let list be sublist's first member's parent's
				// previousSibling."
				var list = sublist[0].parentNode.previousSibling;

				// "Normalize sublists of list's lastChild."
				normalizeSublists(list.lastChild, range);

				// "If list's lastChild is not an editable HTML element
				// with local name tag name, call createElement(tag name)
				// on the context object, and append the result as the last
				// child of list."
				if (!isEditable(list.lastChild) || !isHtmlElement_obsolete(list.lastChild, tagName)) {
					list.appendChild(document.createElement(tagName));
				}

				// "Return the last child of list."
				return list.lastChild;
			};
		}

		if (mode == "disable") {
			while (nodeList.length) {
				// "Let sublist be an empty list of nodes."
				sublist = [];

				// "Remove the first member from node list and append it to
				// sublist."
				sublist.push(nodeList.shift());

				// "If the first member of sublist is an HTML element with local
				// name tag name, outdent it and continue this loop from the
				// beginning."
				if (isHtmlElement_obsolete(sublist[0], tagName)) {
					outdentNode(sublist[0], range);
					continue;
				}

				// "While node list is not empty, and the first member of node list
				// is the nextSibling of the last member of sublist and is not an
				// HTML element with local name tag name, remove the first member
				// from node list and append it to sublist."
				while (nodeList.length && nodeList[0] == sublist[sublist.length - 1].nextSibling && !isHtmlElement_obsolete(nodeList[0], tagName)) {
					sublist.push(nodeList.shift());
				}

				// "Record the values of sublist, and let values be the result."
				values = recordValues(sublist);

				// "Split the parent of sublist."
				splitParent(sublist, range);

				// "Fix disallowed ancestors of each member of sublist."
				var i;
				for (i = 0; i < sublist.length; i++) {
					fixDisallowedAncestors(sublist[i], range);
				}

				// "Restore the values from values."
				restoreValues(values, range);
			}

			// "Otherwise, while node list is not empty:"
		} else {
			while (nodeList.length) {
				// "Let sublist be an empty list of nodes."
				sublist = [];

				// "While either sublist is empty, or node list is not empty and
				// its first member is the nextSibling of sublist's last member:"
				while (!sublist.length || (nodeList.length && nodeList[0] == sublist[sublist.length - 1].nextSibling)) {
					// "If node list's first member is a p or div, set the tag name
					// of node list's first member to "li", and append the result
					// to sublist. Remove the first member from node list."
					if (isHtmlElementInArray(nodeList[0], ["p", "div"])) {
						sublist.push(setTagName(nodeList[0], "li", range));
						nodeList.shift();

						// "Otherwise, if the first member of node list is an li or ol
						// or ul, remove it from node list and append it to sublist."
					} else if (isHtmlElementInArray(nodeList[0], ["li", "ol", "ul"])) {
						sublist.push(nodeList.shift());

						// "Otherwise:"
					} else {
						// "Let nodes to wrap be a list of nodes, initially empty."
						var nodesToWrap = [];

						// "While nodes to wrap is empty, or node list is not empty
						// and its first member is the nextSibling of nodes to
						// wrap's last member and the first member of node list is
						// an inline node and the last member of nodes to wrap is
						// an inline node other than a br, remove the first member
						// from node list and append it to nodes to wrap."
						while (!nodesToWrap.length || (nodeList.length && nodeList[0] == nodesToWrap[nodesToWrap.length - 1].nextSibling && isInlineNode(nodeList[0]) && isInlineNode(nodesToWrap[nodesToWrap.length - 1]) && !isNamedHtmlElement(nodesToWrap[nodesToWrap.length - 1], "br"))) {
							nodesToWrap.push(nodeList.shift());
						}

						// "Wrap nodes to wrap, with new parent instructions
						// returning the result of calling createElement("li") on
						// the context object. Append the result to sublist."
						sublist.push(wrap(
							nodesToWrap,
							undefined,
							createLi,
							range
						));
					}
				}

				// "If sublist's first member's parent is an HTML element with
				// local name tag name, or if every member of sublist is an ol or
				// ul, continue this loop from the beginning."
				if (isHtmlElement_obsolete(sublist[0].parentNode, tagName) || $_(sublist).every(isOlUl)) {
					continue;
				}

				// "If sublist's first member's parent is an HTML element with
				// local name other tag name:"
				if (isHtmlElement_obsolete(sublist[0].parentNode, otherTagName)) {
					// "Record the values of sublist, and let values be the
					// result."
					values = recordValues(sublist);

					// "Split the parent of sublist."
					splitParent(sublist, range);

					// "Wrap sublist, with sibling criteria returning true for an
					// HTML element with local name tag name and false otherwise,
					// and new parent instructions returning the result of calling
					// createElement(tag name) on the context object."
					wrap(
						sublist,
						makeIsElementPred(tagName),
						makeCreateElement(tagName),
						range
					);

					// "Restore the values from values."
					restoreValues(values, range);

					// "Continue this loop from the beginning."
					continue;
				}

				// "Wrap sublist, with sibling criteria returning true for an HTML
				// element with local name tag name and false otherwise, and new
				// parent instructions being the following:"
				// . . .
				// "Fix disallowed ancestors of the previous step's result."
				fixDisallowedAncestors(wrap(
					sublist,
					makeIsElementPred(tagName),
					makeCreateElementSublist(tagName, sublist, range),
					range
				), range);
			}
		}
	}