function createLandingElement($blockElement) {
		var node = document.createElement('span');
		node.className = createLandingClassName($blockElement);
		node.appendChild(document.createTextNode('\u00A0'));

		Ephemera.markWhiteSpaceWrapper(node);

		return node;
	}