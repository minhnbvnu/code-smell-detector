function restackRec(node, hasContext, notIgnoreHorizontal, notIgnoreVertical) {
		if (1 !== node.nodeType || notIgnoreVertical(node)) {
			return null;
		}
		var maybeContext = Dom.next(node.firstChild, notIgnoreHorizontal);
		if (!maybeContext) {
			return null;
		}
		var notIgnorable = Dom.next(maybeContext.nextSibling, notIgnoreHorizontal);
		if (notIgnorable) {
			return null;
		}
		if (hasContext(maybeContext)) {
			return maybeContext;
		}
		return restackRec(maybeContext, hasContext, notIgnoreHorizontal, notIgnoreVertical);
	}