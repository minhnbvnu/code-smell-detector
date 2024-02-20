function makeIsElementWithoutAttributes(value) {
				return function (node) {
					return isHtmlElement_obsolete(node, value) && !node.attributes.length;
				};
			}