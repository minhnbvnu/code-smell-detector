function isExtraneousLineBreak(br) {

		if (!isNamedHtmlElement(br, 'br')) {
			return false;
		}

		if (isNamedHtmlElement(br.parentNode, "li") && br.parentNode.childNodes.length == 1) {
			return false;
		}

		// Make the line break disappear and see if that changes the block's
		// height.  Yes, this is an absurd hack.  We have to reset height etc. on
		// the reference node because otherwise its height won't change if it's not
		// auto.
		var ref = br.parentNode;
		while ($_.getComputedStyle(ref).display == "inline") {
			ref = ref.parentNode;
		}

		var origStyle = {
			height: ref.style.height,
			maxHeight: ref.style.maxHeight,
			minHeight: ref.style.minHeight,
			contentEditable: ref.contentEditable
		};

		ref.style.height = 'auto';
		ref.style.maxHeight = 'none';
		ref.style.minHeight = '0';
		// IE7 would ignore display:none in contentEditable, so we temporarily set it to false
		if (Aloha.browser.msie && Aloha.browser.version <= 7) {
			ref.contentEditable = 'false';
		}

		var origHeight = Dom.getOffsetHeight(ref);
		if (origHeight == 0) {
			throw "isExtraneousLineBreak: original height is zero, bug?";
		}

		var origBrDisplay = br.style.display;
		br.style.display = 'none';
		var finalHeight = ref.offsetHeight;

		// Restore original styles to the touched elements.
		ref.style.height = origStyle.height;
		ref.style.maxHeight = origStyle.maxHeight;
		ref.style.minHeight = origStyle.minHeight;
		// reset contentEditable for IE7
		if (Aloha.browser.msie && Aloha.browser.version <= 7) {
			ref.contentEditable = origStyle.contentEditable;
		}
		br.style.display = origBrDisplay;

		// https://github.com/alohaeditor/Aloha-Editor/issues/516
		// look like it works in msie > 7
		/* if (Aloha.browser.msie && Aloha.browser.version < 8) {
		   br.removeAttribute("style");
		   ref.removeAttribute("style");
		   } */

		return origHeight == finalHeight;
	}