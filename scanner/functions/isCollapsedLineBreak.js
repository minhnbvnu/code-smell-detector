function isCollapsedLineBreak(br) {
		if (!isNamedHtmlElement(br, 'br')) {
			return false;
		}

		// Add a zwsp after it and see if that changes the height of the nearest
		// non-inline parent.  Note: this is not actually reliable, because the
		// parent might have a fixed height or something.
		var ref = br.parentNode;
		while ($_.getComputedStyle(ref).display == "inline") {
			ref = ref.parentNode;
		}

		var origStyle = {
			height: ref.style.height,
			maxHeight: ref.style.maxHeight,
			minHeight: ref.style.minHeight
		};

		ref.style.height = 'auto';
		ref.style.maxHeight = 'none';
		if (!(Aloha.browser.msie && Aloha.browser.version < 8)) {
			ref.style.minHeight = '0';
		}
		var space = document.createTextNode('\u200b');
		var origHeight = ref.offsetHeight;
		if (origHeight == 0) {
			throw 'isCollapsedLineBreak: original height is zero, bug?';
		}
		br.parentNode.insertBefore(space, br.nextSibling);
		var finalHeight = ref.offsetHeight;
		space.parentNode.removeChild(space);

		ref.style.height = origStyle.height;
		ref.style.maxHeight = origStyle.maxHeight;
		if (!(Aloha.browser.msie && Aloha.browser.version < 8)) {
			ref.style.minHeight = origStyle.minHeight;
		}

		// Allow some leeway in case the zwsp didn't create a whole new line, but
		// only made an existing line slightly higher.  Firefox 6.0a2 shows this
		// behavior when the first line is bold.
		return origHeight < finalHeight - 5;
	}