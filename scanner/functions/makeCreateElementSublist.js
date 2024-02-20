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