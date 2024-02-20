function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button) return;

	let t = e.target;
	do {
		if (t.localName === 'a' && t.getAttribute('href')) {
			if (t.hasAttribute('data-native') || t.hasAttribute('native')) return;
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while ((t = t.parentNode));
}