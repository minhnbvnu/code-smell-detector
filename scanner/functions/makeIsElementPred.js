function makeIsElementPred(tagName) {
			return function (node) {
				return isHtmlElement_obsolete(node, tagName);
			};
		}