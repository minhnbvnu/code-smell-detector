function is_element(x) {
		if (!x || typeof x !== "object")
			return false;
		if (("namespaceURI" in x) && ("nodeType" in x) && ("nodeName" in x) && ("childNodes" in x)) {
			return true;
		}
		// window
		if (typeof x.HTMLElement === "function" && typeof x.navigator === "object") {
			return true;
		}
		// very slow
		if (is_interactive) {
			if ((x instanceof Node) ||
				(x instanceof Element) ||
				(x instanceof HTMLDocument) ||
				(x instanceof Window)) {
				return true;
			}
		}
		return false;
	}