function isModifiableElement(node) {
		if (!isAnyHtmlElement(node)) {
			return false;
		}

		if (jQuery.inArray(node.tagName, ["B", "EM", "I", "S", "SPAN", "STRIKE", "STRONG", "SUB", "SUP", "U"]) != -1) {
			if (node.attributes.length == 0) {
				return true;
			}

			if (node.attributes.length == 1 && hasAttribute(node, "style")) {
				return true;
			}
		}

		if (node.tagName == "FONT" || node.tagName == "A") {
			var numAttrs = node.attributes.length;

			if (hasAttribute(node, "style")) {
				numAttrs--;
			}

			if (node.tagName == "FONT") {
				if (hasAttribute(node, "color")) {
					numAttrs--;
				}

				if (hasAttribute(node, "face")) {
					numAttrs--;
				}

				if (hasAttribute(node, "size")) {
					numAttrs--;
				}
			}

			if (node.tagName == "A" && hasAttribute(node, "href")) {
				numAttrs--;
			}

			if (numAttrs == 0) {
				return true;
			}
		}

		return false;
	}