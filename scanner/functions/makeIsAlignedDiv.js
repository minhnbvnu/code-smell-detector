function makeIsAlignedDiv(alignment) {
			return function (node) {
				return isNamedHtmlElement(node, 'div') && $_(node.attributes).every(function (attr) {
					return (attr.name == "align" && attr.value.toLowerCase() == alignment) || (attr.name == "style" && getStyleLength(node) == 1 && node.style.textAlign == alignment);
				});
			};
		}