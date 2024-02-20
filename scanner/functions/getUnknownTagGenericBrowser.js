function getUnknownTagGenericBrowser(object, tag) {
	if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
	return getUnknownTag(object, tag);
	}