function ensureContainerEditable(container) {
		if (!container) {
			return;
		}

		// Because it is useful to be able to completely empty the contents of
		// an editing host during editing.  So long as the container's
		// contenteditable attribute is "true" (as is the case during editing),
		// the element will be rendered visibly in all browsers.  This fact
		// allows us to not have to prop up the container with a <br> in order
		// to keep it accessible to the editor.
		if (isEditingHost(container)) {
			return;
		}

		if (isNamedHtmlElement(container.lastChild, "br")) {
			return;
		}

		if ($_(container.childNodes).some(isVisible)) {
			return;
		}

		if (!Aloha.browser.msie || parseInt(Aloha.browser.version, 10) >= 11) {
			// for normal browsers, the end-br will do
			container.appendChild(createEndBreak());
		} else if (Aloha.browser.msie && Aloha.browser.version <= 7 && isHtmlElementInArray(container, ["p", "h1", "h2", "h3", "h4", "h5", "h6", "pre", "blockquote"])) {
			// for IE7, we need to insert a text node containing a single zero-width whitespace character
			if (!container.firstChild) {
				container.appendChild(document.createTextNode('\u200b'));
			}
		}
	}